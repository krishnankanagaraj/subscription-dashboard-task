import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetPlansQuery } from '../../store/api/plansApiSlice';
import { useCreateOrderMutation, useVerifyPaymentMutation } from '../../store/api/subscriptionApiSlice';
import { loadRazorpay } from '../../utils/razorpay';
import Button from '../../components/UI/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/UI/Card';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Plans = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { data: plans, isLoading: isPlansLoading } = useGetPlansQuery();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();

  const handleSubscribe = async (plan) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const order = await createOrder(plan._id).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SubManager',
        description: `Subscription for ${plan.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              planId: plan._id,
            }).unwrap();
            navigate('/dashboard');
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#2563eb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err?.data?.message || 'Something went wrong');
    }
  };

  if (isPlansLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose your plan
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Select the perfect plan for your needs
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans?.map((plan, index) => (
          <motion.div
            key={plan._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-bold tracking-tight">₹{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    /{plan.duration === 365 ? 'year' : 'month'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(plan)}
                  isLoading={isCreatingOrder || isVerifying}
                >
                  {isAuthenticated ? 'Subscribe Now' : 'Login to Subscribe'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
