// src/services/api.js
import axios from "axios";

export const SERVER_URL = "http://192.168.1.38:8000";

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle FormData
api.interceptors.request.use(
  (config) => {
    // If the data is FormData, remove the Content-Type header
    // so the browser can set it with the correct boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    // Add authorization token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${SERVER_URL}/api/auth/refresh/`, {
            refresh: refreshToken
          });
          localStorage.setItem('access_token', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login if refresh fails
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;