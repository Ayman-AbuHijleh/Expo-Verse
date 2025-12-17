import axios from 'axios';

// API Base URL - Updated to match backend API versioning
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    console.log('🔵 API Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      data: config.data,
    });
    
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token added to request');
    } else {
      console.log('⚠️ No token found');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      globalThis.location.href = '/login';
    }
    
    // Network error (backend not running)
    if (error.message === 'Network Error') {
      console.error('🔴 Backend server is not running on http://localhost:5000');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
