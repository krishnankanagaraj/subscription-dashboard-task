const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshToken,
} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/refresh-token', refreshToken);

module.exports = router;
