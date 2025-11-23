const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshToken,
  updateProfile,
} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema, updateProfileSchema } = require('../validations/auth.validation');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/refresh-token', refreshToken);
router.put('/profile-update', protect, validate(updateProfileSchema), updateProfile);

module.exports = router;
