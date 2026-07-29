import { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../services/api";
import img1 from "../assets/images/restaurant_interior.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithCredentials } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithCredentials(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={img1}
      title="Welcome Back"
      subtitle="Login to continue"
    >
      <h2>Login</h2>

      {error && <p style={{ color: '#e05555', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
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
          {loading ? 'Signing in...' : 'Login'}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
