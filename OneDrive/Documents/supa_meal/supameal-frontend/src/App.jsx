import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Public pages
import LandingPage from './pages/LandingPage';
import Restaurants from './pages/Restaurants/Restaurants';
import RestaurantDetails from './pages/Restaurants/RestaurantDetails';

// Auth / onboarding (demo navigation only)
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyOtp from './pages/auth/VerifyOtp';
import OAuthCallback from './pages/auth/OAuthCallback';

// Public forms
import BookTable from './pages/booking/BookTable';
import RegisterRestaurant from './pages/owner/RegisterRestaurant';
import OwnerLogin from './pages/owner/OwnerLogin';

// Dashboards (open access — no auth gate)
import CustomerDashboard from './pages/customer/CustomerDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

import PageTransition from './components/PageTransition/PageTransition';

const PT = ({ children }) => <PageTransition>{children}</PageTransition>;

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public marketing */}
        <Route path="/" element={<PT><LandingPage /></PT>} />
        <Route path="/restaurants" element={<PT><Restaurants /></PT>} />
        <Route path="/restaurants/:id" element={<PT><RestaurantDetails /></PT>} />

        {/* Auth / onboarding flows */}
        <Route path="/login" element={<PT><Login /></PT>} />
        <Route path="/signup" element={<PT><SignUp /></PT>} />
        <Route path="/reset-password" element={<PT><ResetPassword /></PT>} />
        <Route path="/forgot-password" element={<PT><ResetPassword /></PT>} />
        <Route path="/verify-otp" element={<PT><VerifyOtp /></PT>} />
        <Route path="/auth/callback" element={<PT><OAuthCallback /></PT>} />

        {/* Public feature pages */}
        <Route path="/book-table" element={<PT><BookTable /></PT>} />
        <Route path="/register-restaurant" element={<PT><RegisterRestaurant /></PT>} />
        <Route path="/owner-login" element={<PT><OwnerLogin /></PT>} />

        {/* Dashboards — freely accessible */}
        <Route path="/customer/dashboard" element={<PT><CustomerDashboard /></PT>} />
        <Route path="/owner/dashboard" element={<PT><OwnerDashboard /></PT>} />
        <Route path="/admin/dashboard" element={<PT><AdminDashboard /></PT>} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
