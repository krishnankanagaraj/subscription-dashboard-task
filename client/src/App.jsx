import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Plans from './pages/Plans/Plans';
import Dashboard from './pages/Dashboard/Dashboard';
import Subscriptions from './pages/Admin/Subscriptions';
import Profile from './pages/Profile/Profile';

import RequireAuth from './components/Auth/RequireAuth';
import IdleTimer from './components/Auth/IdleTimer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  React.useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <Router>
      <IdleTimer />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Layout />}>

          {user?.role === 'admin' ? 
          <Route index element={<Navigate to="/admin/subscriptions" replace />} /> :
           user?.role === 'user' ? 
           <Route index element={<Navigate to="/dashboard" replace />}/> :
            <Route index element={<Navigate to="/plans" replace />} />}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="plans" element={<Plans />} />
          
          {/* Protected User Routes */}
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Protected Admin Routes */}

          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="admin/subscriptions" element={<Subscriptions />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}





export default App;

