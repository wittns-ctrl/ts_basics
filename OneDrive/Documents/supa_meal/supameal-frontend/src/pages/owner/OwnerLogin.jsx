import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import '../auth/AuthForm.css';

const OwnerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enterAs } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      enterAs('restaurant_owner');
      navigate('/owner/dashboard', { replace: true });
      setIsLoading(false);
    }, 1200);
  };

  if (isLoading) return <Loader text="Opening owner dashboard..." />;

  return (
    <AuthLayout 
      title="Owner Portal" 
      subtitle="Manage your restaurant, orders, and reservations."
    >
      <div className="auth-form-header">
        <Store size={32} className="auth-form-icon" />
        <h3>Partner Login</h3>
        <p>Access your restaurant dashboard (demo mode)</p>
      </div>

      <form onSubmit={handleLogin}>
        <Button variant="primary" className="auth-submit-btn" type="submit">
          Enter Owner Dashboard
        </Button>
      </form>

      <div className="auth-footer" style={{ justifyContent: 'center', marginTop: '1.5rem', gap: '0.5rem' }}>
        <span>Not a partner yet?</span>
        <Link to="/register-restaurant" className="auth-footer-link" style={{ color: 'var(--primary)' }}>
          Register Restaurant
        </Link>
      </div>
    </AuthLayout>
  );
};

export default OwnerLogin;
