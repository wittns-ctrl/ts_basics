import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationsProvider } from './context/NotificationsContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import OAuthCallback from './pages/auth/OAuthCallback';
import RestaurantsPage from './pages/Restaurants/Restaurants';
import RestaurantDetail from './pages/Restaurants/RestaurantDetails';
import CartPage from './pages/customer/CartPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MenuPage from './pages/customer/MenuPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderTrackingPage from './pages/customer/OrderTracking';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/customer/ProfilePage';
import ReservationsPage from './pages/customer/ReservationsPage';

const ROLE_HOME = {
  customer: '/customer/dashboard',
  owner: '/owner/dashboard',
  admin: '/admin/dashboard',
};

const HomeRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user?.role && ROLE_HOME[user.role]) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return <LandingPage />;
};

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();
  const loginRedirect = isAuthenticated ? (
    <Navigate to={ROLE_HOME[user?.role] || '/customer/dashboard'} replace />
  ) : null;

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route
        path="/login"
        element={loginRedirect || <Login />}
      />
      <Route
        path="/signup"
        element={loginRedirect || <SignUp />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute roles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={['customer', 'owner', 'admin']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute roles={['customer']}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute roles={['customer']}>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-tracking/:orderId"
        element={
          <ProtectedRoute roles={['customer', 'owner', 'admin']}>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute roles={['customer']}>
            <ReservationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute roles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <NotificationsProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </NotificationsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
