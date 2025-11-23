# Subscription Management Dashboard

A full-stack subscription management system with JWT authentication, role-based access control, Razorpay payment integration, and a modern dark/light mode UI.

## 👨‍💻 Task Done By
- Name: Krishnan
- Email: krishnankanagaraj2105@gmail.com
- Mobile: 8668084373

## 🔗 Links

- **GitHub Repository**: https://github.com/krishnankanagaraj/subscription-dashboard-task.git
- **Frontend Deployment**: https://subscription-dashboard-task-1.onrender.com/
- **Backend Deployment**:https://subscription-dashboard-task-86cp.onrender.com/

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
- **MongoDB** - Database (Atlas for production)
- **Mongoose** - ORM for MongoDB
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
- **Admin Dashboard** to view all subscriptions users
- **Search Functionality** with debouncing (500ms)
- **Real-time Subscription Status** (active/expired)

### UI/UX Features
- **Dark Mode Support** with persistent theme storage
- **Responsive Design** - Mobile, tablet, and desktop
- **Toast Notifications** - User-friendly feedback
- **Loading States** - Spinners
- **Smooth Animations** - Framer Motion transitions
- **Form Validation** - Real-time error messages

---
## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **Razorpay Account** (for payment integration)

### 1. Clone the Repository
```bash
git clone https://github.com/krishnankanagaraj/subscription-dashboard-task.git
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

# Database
MONGODB_URI=mongodb://localhost:27017/subscription-db
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-db

# JWT Secrets
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

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

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "krishnan",
  "email": "krishnan@gmail.com",
  "password": "user"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Cookie: refreshToken=xxx
```
#### user profile update
```http
GET /api/auth/profile-update
Authorization: Bearer {accessToken}
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
POST /api/subscriptions/create-order/{planId}
Authorization: Bearer {accessToken}
Content-Type: application/json
{user:{name:krishnan,email:krishnan@gmail.com,_id:123}}
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
  "userId": "123"
}
```

#### Get My Subscription
```http
GET /api/subscriptions/my-subscription
Authorization: Bearer {accessToken}
```

#### Get All Subscriptions (Admin)
```http
GET /api/subscriptions/admin/subscriptions
Authorization: Bearer {accessToken}
```

---

## 🎨 Features Walkthrough

### 1. User Registration & Login
- Users can register with name, email, and password
- Passwords are securely hashed using bcrypt
- JWT tokens are issued upon successful login
- Refresh tokens stored in localStorage

### 2. Subscription Plans
- Four tiers: Basic, Standard, Premium and Annual Basic
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
- Check subscription start and end dates
- View payment ID

### 5. Admin Dashboard
- View all user subscriptions users list
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
- Shows warning toast on logout
- Resets on user interaction

---

## 🚢 Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Update `MONGODB_URI` to production database
3. Deploy using platform-specific commands

### Frontend Deployment

1. Build the project: `npm run build`
2. Set `VITE_API_URL` to production backend URL
3. Set `VITE_RAZORPAY_KEY_ID` to production Razorpay key
4. Deploy the `dist` folder

### Important Notes
- Update CORS settings in backend for production URL
- Use production Razorpay keys
- Enable HTTPS for both frontend and backend

---

## 👨‍💻 Task Done By
- Name: Krishnan
- Email: krishnankanagaraj2105@gmail.com
- mobile: 8668084373
---
