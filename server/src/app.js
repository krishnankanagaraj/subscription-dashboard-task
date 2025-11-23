const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // for local dev (Vite)
  "https://subscription-dashboard-task-1.onrender.com/" // production frontend
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes (to be imported)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/plans', require('./routes/plan.routes'));
app.use('/api/subscriptions', require('./routes/subscription.routes')); // Mounts /subscribe and /my-subscription and /admin/subscriptions


// Base route
app.get('/', (req, res) => {
  res.send('Subscription Management API is running...');
});

// Error Handler
app.use(errorHandler);

module.exports = app;
