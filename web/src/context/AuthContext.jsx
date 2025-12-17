import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      console.log('Login response:', data);
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        
        // Use user data from response if available, otherwise decode JWT
        let user;
        if (data.user) {
          user = data.user;
        } else {
          // Decode JWT to get user info (fallback)
          const tokenParts = data.token.split('.');
          const encodedPayload = tokenParts[1];
          const decodedPayload = JSON.parse(atob(encodedPayload));
          
          user = {
            userId: decodedPayload.userId,
            email: decodedPayload.email,
            role: decodedPayload.role,
            name: email.split('@')[0],
          };
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (userData) => {
    return await authAPI.signup(userData);
  };

  const verify = async (email, code) => {
    const data = await authAPI.verify(email, code);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    signup,
    verify,
    logout,
    isAuthenticated: !!user,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
