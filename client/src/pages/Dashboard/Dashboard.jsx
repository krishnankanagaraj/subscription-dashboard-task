import React from 'react';
import { useGetMySubscriptionQuery } from '../../store/api/subscriptionApiSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import { Loader2, Calendar, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: subscription, isLoading, error } = useGetMySubscriptionQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">No Active Subscription</h3>
        <p className="mt-2 text-gray-500 dark:text-slate-400">Click here to subscribe</p>
        <Button className="mt-4" onClick={()=>navigate('/plans')}>
          Subscribe
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">My Subscription</h2>
        <Card>
          <CardHeader className="border-b bg-gray-50/50 dark:bg-slate-700/50 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                Active
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
                  {subscription.plan.name}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                  ₹{subscription.plan.price}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-slate-300">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">Start Date</p>
                    <p className="text-sm">{new Date(subscription.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-slate-300">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">End Date</p>
                    <p className="text-sm">{new Date(subscription.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-slate-300">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-400 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">Payment ID</p>
                    <p className="text-sm font-mono">{subscription.razorpayPaymentId}</p>
                  </div>
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-1">
              <div>
                <h3 className="text-3xl font-medium text-gray-900 dark:text-slate-100 mb-2">
                  Features
                </h3>
              </div>
              <div className="space-y-4">
                {subscription?.plan.features.map(feature=>{
                  return(
                <div className="flex items-center text-gray-600 dark:text-slate-300">
                  <CheckCircle className="h-5 w-5 mr-3 text-gray-400 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{feature}</p>
                  </div>
                </div>
                  )
                })}
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
