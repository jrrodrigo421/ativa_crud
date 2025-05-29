import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Check if token exists in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // You could fetch user data here
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Authentication failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerService(userData);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 