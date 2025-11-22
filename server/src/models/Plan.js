const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [{
    type: String,
  }],
  duration: {
    type: Number, // in days
    required: true,
  },
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
