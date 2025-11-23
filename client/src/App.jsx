import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Plans from './pages/Plans/Plans';
import Dashboard from './pages/Dashboard/Dashboard';
import Subscriptions from './pages/Admin/Subscriptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/plans" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="plans" element={<Plans />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin/subscriptions" element={<Subscriptions />} />
        </Route>
      </Routes>
    </Router>
  );
}




export default App;

