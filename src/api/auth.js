import apiClient from '../lib/apiClient';

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  },

  signup: async (userData) => {
    const response = await apiClient.post('/users/signup', userData);
    return response.data;
  },

  verify: async (email, code) => {
    const response = await apiClient.post('/users/verify', { email, code });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};
