import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  return (
    <AuthLayout
      image="/steak-signup.png"
      title="Create Account"
      subtitle="Join SupaMeal today"
    >

      <h2>Create Account</h2>

      <input placeholder="First Name" />

      <input placeholder="Last Name" />

      <input placeholder="Phone Number" />

      <input placeholder="Email Address" />

      <input
        type="password"
        placeholder="Password"
      />

      <motion.button
        className="gold-button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        Create Account
      </motion.button>

    </AuthLayout>
  );
}