# Subscription Management Dashboard

A full-stack subscription management system with JWT authentication, role-based access control, Razorpay payment integration, and a modern dark mode UI.

## 🔗 Links

- **GitHub Repository**: `[Add your GitHub repo URL here]`
- **Frontend Deployment**: `[Add your frontend deployment URL here]`
- **Backend Deployment**: `[Add your backend deployment URL here]`

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Razorpay** - Payment gateway integration
- **Bcrypt.js** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router DOM** - Routing
- **React Hook Form** - Form handling
- **Zod** - Form validation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Toastify** - Toast notifications
- **Vite** - Build tool

---

## ✨ Features

### Authentication & Authorization
- **JWT-based Authentication** with access and refresh tokens
- **Role-based Access Control** (Admin & User roles)
- **Secure Password Hashing** using bcrypt
- **Idle Timeout** - Auto logout after 15 minutes of inactivity
- **Protected Routes** - Client-side route protection

### User Management
- User registration and login
- Profile management (age, gender, mobile)
- User dashboard with subscription details

### Subscription Management
- **Multiple Subscription Plans** (Basic, Standard, Premium)
- **Plan Features Display** with pricing
- **Active Subscription Status** tracking
- **Subscription History** for users

### Payment Integration
- **Razorpay Integration** for secure payments
- **Order Creation** and verification
- **Payment Signature Validation**
- **Transaction Tracking** with payment IDs

### Admin Features
- **Admin Dashboard** to view all subscriptions
- **Search Functionality** with debouncing (500ms)
- **User Subscription Management**
- **Real-time Subscription Status** (active/expired)

### UI/UX Features
- **Dark Mode Support** with persistent theme storage
- **Responsive Design** - Mobile, tablet, and desktop
- **Toast Notifications** - User-friendly feedback
- **Loading States** - Skeleton loaders and spinners
- **Smooth Animations** - Framer Motion transitions
- **Form Validation** - Real-time error messages

---

## 📁 Project Structure

```
subscription-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Auth/      # Authentication components
│   │   │   ├── Layout/    # Layout components (Navbar, Layout)
│   │   │   └── UI/        # UI components (Button, Card, Input)
│   │   ├── pages/         # Page components
│   │   │   ├── Admin/     # Admin pages
│   │   │   ├── Auth/      # Login & Register
│   │   │   ├── Dashboard/ # User dashboard
│   │   │   ├── Plans/     # Subscription plans
│   │   │   └── Profile/   # User profile
│   │   ├── store/         # Redux store
│   │   │   ├── api/       # RTK Query API slices
│   │   │   └── slices/    # Redux slices
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── utils/         # Utility functions
    │   └── server.js      # Entry point
    ├── .env
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **Razorpay Account** (for payment integration)

### 1. Clone the Repository
```bash
git clone [your-repo-url]
cd subscription-dashboard
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/subscription-db
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-db

# JWT Secrets
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# JWT Expiry
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# CORS
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../client
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🏃 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Backend in Production
```bash
cd server
npm start
```

---

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/subscription-db` |
| `JWT_ACCESS_SECRET` | Secret for access tokens | `your-secret-key` |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | `your-refresh-secret` |
| `JWT_ACCESS_EXPIRY` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRY` | Refresh token expiry | `7d` |
| `RAZORPAY_KEY_ID` | Razorpay API key | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | `your_secret` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key for frontend | `rzp_test_xxxxx` |

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Cookie: refreshToken=xxx
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {accessToken}
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer {accessToken}
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "age": 25,
  "gender": "Male",
  "mobile": "1234567890"
}
```

### Subscription Endpoints

#### Get All Plans
```http
GET /api/plans
```

#### Create Order
```http
POST /api/subscriptions/create-order
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "planId": "plan_id_here"
}
```

#### Verify Payment
```http
POST /api/subscriptions/verify-payment
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx",
  "planId": "plan_id_here",
  "userId": "user_id_here"
}
```

#### Get My Subscription
```http
GET /api/subscriptions/my-subscription
Authorization: Bearer {accessToken}
```

#### Get All Subscriptions (Admin)
```http
GET /api/subscriptions
Authorization: Bearer {accessToken}
```

---

## 🎨 Features Walkthrough

### 1. User Registration & Login
- Users can register with name, email, and password
- Passwords are securely hashed using bcrypt
- JWT tokens are issued upon successful login
- Refresh tokens stored in HTTP-only cookies

### 2. Subscription Plans
- Three tiers: Basic, Standard, Premium
- Each plan displays features and pricing
- Users can view all available plans
- Active subscription is highlighted

### 3. Payment Flow
1. User selects a plan
2. Order is created on the backend
3. Razorpay payment modal opens
4. User completes payment
5. Payment is verified on the backend
6. Subscription is activated

### 4. User Dashboard
- View current subscription details
- See plan features
- Check subscription dates
- View payment ID

### 5. Admin Dashboard
- View all user subscriptions
- Search users by name or email
- See subscription status (active/expired)
- View payment details

### 6. Dark Mode
- Toggle between light and dark themes
- Theme preference persists in localStorage
- All components styled for both modes
- Smooth transitions between themes

### 7. Idle Timeout
- Automatically logs out users after 15 minutes of inactivity
- Shows warning toast before logout
- Resets on user interaction

---

## 🚢 Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Set environment variables in your hosting platform
2. Update `MONGODB_URI` to production database
3. Update `CLIENT_URL` to production frontend URL
4. Deploy using platform-specific commands

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the project: `npm run build`
2. Set `VITE_API_URL` to production backend URL
3. Set `VITE_RAZORPAY_KEY_ID` to production Razorpay key
4. Deploy the `dist` folder

### Important Notes
- Update CORS settings in backend for production URL
- Use production Razorpay keys
- Enable HTTPS for both frontend and backend
- Set `NODE_ENV=production` in backend

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile update
- [ ] View subscription plans
- [ ] Complete payment flow
- [ ] View user dashboard
- [ ] Admin dashboard access
- [ ] Search functionality
- [ ] Theme toggle
- [ ] Idle timeout
- [ ] Responsive design

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@yourusername]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React and Redux teams for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- Razorpay for payment integration
- All open-source contributors
