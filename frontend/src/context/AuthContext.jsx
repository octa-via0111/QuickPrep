import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('user'); // 'user' | 'admin'

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getUser());
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const openLogin = (tab = 'user') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeLogin = () => {
    setIsAuthModalOpen(false);
  };

  const loginAsAdmin = async (username, password) => {
    const res = await authService.loginAdmin(username, password);
    setCurrentUser(authService.getUser());
    closeLogin();
    return res;
  };

  const loginAsUser = async (data) => {
    const res = await authService.loginUser(data);
    setCurrentUser(authService.getUser());
    closeLogin();
    return res;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === 'admin',
    isUser: currentUser?.role === 'user',
    isAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    openLogin,
    closeLogin,
    loginAsAdmin,
    loginAsUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};

export default AuthContext;
