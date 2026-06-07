import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button/Button';
import { authApi } from '../../services/api';
import './AuthForm.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.forgot({ email });
      setMessage(res.message || 'Reset link sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.reset({ token, newPassword });
      setMessage(res.message || 'Password reset successfully');
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={token ? 'Set New Password' : 'Forgot Password?'} 
      subtitle={token ? 'Enter your new password below.' : "Don't worry, we'll send you reset instructions."}
    >
      <div className="auth-form-header">
        <KeyRound size={32} className="auth-form-icon" style={{ color: 'var(--primary)' }} />
        <h3>{token ? 'Reset Password' : 'Reset Password'}</h3>
        <p>{token ? 'Choose a strong new password' : 'Enter your email to receive a reset link'}</p>
      </div>

      {message && <p style={{ color: '#4caf80', textAlign: 'center', marginBottom: '1rem' }}>{message}</p>}
      {error && <p style={{ color: '#e05555', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={token ? handleReset : handleForgot}>
        {!token ? (
          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input type="email" placeholder="john@example.com" className="auth-input" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="auth-input-group">
            <label>New Password</label>
            <div className="auth-input-wrapper">
              <KeyRound size={18} className="auth-input-icon" />
              <input type="password" placeholder="New password" className="auth-input" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
          </div>
        )}

        <Button variant="primary" className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : token ? 'Reset Password' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="auth-footer" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/login" className="auth-footer-link" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
