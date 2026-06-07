import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import './AuthForm.css';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const email = localStorage.getItem('pendingVerificationEmail') || '';

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) return;
    setLoading(true);
    setError('');
    try {
      await verifyOtp(email, code);
      localStorage.removeItem('pendingVerificationEmail');
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Almost there!" 
      subtitle="Verify your email to complete registration."
    >
      <div className="auth-form-header">
        <ShieldCheck size={32} className="auth-form-icon" style={{ color: 'var(--primary)' }} />
        <h3>Verify Email</h3>
        <p>We've sent a 6-digit code to {email || 'your email'}.</p>
      </div>

      {error && <p style={{ color: '#e05555', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

      <form onSubmit={handleVerify}>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: '48px',
                height: '56px',
                fontSize: '1.5rem',
                textAlign: 'center',
                backgroundColor: '#1a1a1a',
                border: `1px solid ${digit ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-main)',
                transition: 'all var(--transition-fast)'
              }}
              required
            />
          ))}
        </div>

        <Button variant="primary" className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Account'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Button>
      </form>

      <div className="auth-footer" style={{ justifyContent: 'center', marginTop: '2rem', flexDirection: 'column', gap: '1rem' }}>
        <span>Didn't receive the code?</span>
        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}>
          Resend Code
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
