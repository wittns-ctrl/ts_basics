import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, UtensilsCrossed, Store, LogIn } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import './AuthForm.css';

const DASHBOARD_ROUTES = {
  customer: '/customer/dashboard',
  restaurant_owner: '/owner/dashboard',
  admin: '/admin/dashboard',
};

const ROLE_LABELS = {
  customer: { label: 'Customer', icon: UtensilsCrossed },
  restaurant_owner: { label: 'Restaurant Owner', icon: Store },
  admin: { label: 'Admin', icon: ShieldCheck },
};

const Login = () => {
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const { enterAs } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enterAs(role);
      navigate(DASHBOARD_ROUTES[role], { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      alert(err.message || 'Login failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Signing you in..." />;

  return (
    <AuthLayout
      title="Welcome back to SupaMeal"
      subtitle="Sign in to access your dashboard."
    >
      <div className="auth-form-header">
        <LogIn size={32} className="auth-form-icon" style={{ color: 'var(--primary)' }} />
        <h3>Sign In</h3>
        <p>Select your account type to continue</p>
      </div>

      <form onSubmit={handleSignIn}>
        <div className="auth-input-group">
          <label>I am a...</label>
          <div className="role-selector" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {Object.entries(ROLE_LABELS).map(([r, { label, icon: Icon }]) => (
              <button
                type="button"
                key={r}
                className={`role-btn ${role === r ? 'active' : ''}`}
                onClick={() => setRole(r)}
                style={{
                  padding: '0.75rem 0.5rem',
                  fontSize: '0.78rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  height: '80px',
                }}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" className="auth-submit-btn" type="submit">
          <LogIn size={18} style={{ marginRight: '8px' }} />
          Sign In as {ROLE_LABELS[role].label}
        </Button>
      </form>

      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>Or explore public pages:</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/restaurants" className="auth-footer-link" style={{ fontSize: '0.85rem' }}>Restaurants</Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link to="/book-table" className="auth-footer-link" style={{ fontSize: '0.85rem' }}>Book a Table</Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link to="/register-restaurant" className="auth-footer-link" style={{ fontSize: '0.85rem' }}>Register Restaurant</Link>
        </div>
      </div>

      <div className="auth-footer" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <span>New to SupaMeal?</span>
        <Link to="/signup" className="auth-footer-link">
          Create an account <ChevronRight size={16} />
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
