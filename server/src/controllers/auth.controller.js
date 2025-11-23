const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (user) {
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Save refresh token to DB (optional, but good for revocation)
      user.refreshToken = refreshToken;
      await user.save();

      res.status(201).json({
        user: user,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      let subscription = await Subscription.findOne({ user: user._id });
      
      // Check for subscription expiry (Date part only)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (subscription && subscription.status === 'active' && subscription.endDate < today) {
        subscription.status = 'expired';
        await subscription.save();
      }

      const { accessToken, refreshToken } = generateTokens(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      res.json({
        user: user,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401);
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(401);
      throw new Error('Invalid refresh token');
    }

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json(tokens);
  } catch (error) {
    res.status(401);
    next(new Error('Invalid refresh token'));
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.age = req.body.age || user.age;
      user.gender = req.body.gender || user.gender;
      user.mobile = req.body.mobile || user.mobile;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        age: updatedUser.age,
        gender: updatedUser.gender,
        mobile: updatedUser.mobile,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  updateProfile,
};
