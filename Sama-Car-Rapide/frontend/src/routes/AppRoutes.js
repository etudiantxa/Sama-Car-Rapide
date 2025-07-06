import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import BookingPage from '../pages/BookingPage';
import Navbar from '../components/Navbar';
// Import other pages as they are created
// import ProfilePage from '../pages/ProfilePage';
// import DriverDashboard from '../pages/DriverDashboard';
// import AdminPanel from '../pages/AdminPanel';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> {/* Common Navbar for all pages */}
      <div style={{ padding: '20px' }}> {/* Basic layout padding */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* Add more routes here as pages are developed */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/driver/dashboard" element={<DriverDashboard />} /> */}
          {/* <Route path="/admin" element={<AdminPanel />} /> */}

          {/* Fallback route for 404 */}
          <Route path="*" element={<div><h2>404 Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
