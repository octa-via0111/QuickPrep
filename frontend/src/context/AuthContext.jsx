import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  const openLogin = () => {
    setIsAuthModalOpen(true);
  };

  const closeLogin = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (data) => {
    const res = await authService.unifiedLogin(data);
    setCurrentUser(authService.getUser());
    closeLogin();
    return res;
  };

  const loginAsAdmin = async (username, password) => {
    return login({ identifier: username, password });
  };

  const loginAsUser = async (data) => {
    return login({ name: data.name, identifier: data.email, password: data.password });
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
    openLogin,
    closeLogin,
    login,
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
