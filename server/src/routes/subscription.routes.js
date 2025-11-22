const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMySubscription,
  getAllSubscriptions,
} = require('../controllers/subscription.controller');
const { protect, admin } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
// const { createSubscriptionSchema } = require('../validations/subscription.validation'); // Might need update or removal

// User routes
router.post('/create-order/:planId', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/my-subscription', protect, getMySubscription);


// Admin routes
router.get('/admin/subscriptions', protect, admin, getAllSubscriptions);

module.exports = router;
