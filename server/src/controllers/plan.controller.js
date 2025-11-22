const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    next(error);
  }
};
const updatePlans = async (req, res, next) => {
  try {
    const planId = req.params.id; // /plans/:id

    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(updatedPlan);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getPlans,
  updatePlans,
};
