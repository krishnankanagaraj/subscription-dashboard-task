const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

const crypto = require('crypto');
const razorpay = require('../config/razorpay');

// @desc    Create Razorpay Order
// @route   POST /api/subscriptions/create-order/:planId
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const userId = req.user._id;

    const plan = await Plan.findById(planId);
    if (!plan) {
      res.status(404);
      throw new Error('Plan not found');
    }

    const options = {
      amount: plan.price * 100, // amount in smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      res.status(500);
      throw new Error('Some error occured');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/subscriptions/verify-payment
// @access  Private
const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      planId,
    } = req.body;
    const userId = req.user._id;

    const body = razorpayOrderId + '|' + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      const plan = await Plan.findById(planId);
      
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + plan.duration);

      await Subscription.create({
        user: userId,
        plan: planId,
        startDate,
        endDate,
        status: 'active',
        razorpayOrderId,
        razorpayPaymentId,
      });

      res.json({
        message: 'Payment verified and subscription activated',
      });
    } else {
      res.status(400);
      throw new Error('Payment verification failed');
    }
  } catch (error) {
    next(error);
  }
};


// @desc    Get current user's subscription
// @route   GET /api/my-subscription
// @access  Private
const getMySubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active',
      endDate: { $gt: Date.now() },
    }).populate('plan');

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    res.json(subscription);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all subscriptions (Admin)
// @route   GET /api/admin/subscriptions
// @access  Private/Admin
const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({})
      .populate('user', 'name email')
      .populate('plan', 'name price');
    res.json(subscriptions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMySubscription,
  getAllSubscriptions,
};

