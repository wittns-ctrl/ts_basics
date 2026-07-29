import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import img1 from "../assets/images/restaurant_interior.png";

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup({
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        phone: Number(phone.replace(/\D/g, '')) || phone,
        role: 'customer',
      });
      navigate('/verify-otp');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={img1}
      title="Create Account"
      subtitle="Join SupaMeal today"
    >
      <h2>Create Account</h2>

      {error && <p style={{ color: '#e05555', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <motion.button
          type="submit"
          className="gold-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
