import { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <AuthLayout
      image="/steak-login.png"
      title="Welcome Back"
      subtitle="Login to continue"
    >

      <h2>Login</h2>

      <input
        placeholder="Email Address"
      />

      <input
        type={
          showPassword
            ? "text"
            : "password"
        }
        placeholder="Password"
      />

      <motion.button
        className="gold-button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>

    </AuthLayout>
  );
}