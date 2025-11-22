const express = require('express');
const router = express.Router();
const { getPlans,updatePlans } = require('../controllers/plan.controller');
const validate = require('../middlewares/validate.middleware');
const { updatePlanSchema } = require('../validations/plan.validation');
const { protect, admin } = require('../middlewares/auth.middleware');

router.get('/', getPlans);
router.put('/:id', protect, admin, validate(updatePlanSchema), updatePlans);


module.exports = router;
