import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const persistAuth = useCallback((authUser, accessToken, refreshToken) => {
    setUser(authUser);
    localStorage.setItem('user', JSON.stringify(authUser));
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  }, []);

  const loginWithCredentials = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password });
    persistAuth(res.user, res.accessToken, res.refreshToken);
    return res.user;
  }, [persistAuth]);

  const enterAs = useCallback(async (role) => {
    const { DEMO_CREDENTIALS } = await import('../services/api');
    const creds = DEMO_CREDENTIALS[role];
    if (!creds) return null;
    return loginWithCredentials(creds.email, creds.password);
  }, [loginWithCredentials]);

  const login = useCallback(async (email, password, role = 'customer') => {
    if (email && password) {
      return loginWithCredentials(email, password);
    }
    return enterAs(role);
  }, [loginWithCredentials, enterAs]);

  const signup = useCallback(async (data) => {
    return authApi.signup(data);
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    const res = await authApi.verifyOtp({ email, otp });
    if (res.user && res.accessToken) {
      persistAuth(res.user, res.accessToken, res.refreshToken);
    }
    return res;
  }, [persistAuth]);

  const resendOtp = useCallback(async (email) => {
    return authApi.resendOtp(email);
  }, []);

  const logout = useCallback(async () => {
    const email = user?.email;
    try {
      if (email) await authApi.logout({ email });
    } catch {
      // ignore logout API errors
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithCredentials,
      logout,
      enterAs,
      signup,
      verifyOtp,
      resendOtp,
      loading,
      isAuthenticated: !!user,
      isDemoMode: false,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
