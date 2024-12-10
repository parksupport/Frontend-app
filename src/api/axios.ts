// services/axiosInstance.js

import axios from 'axios';
import { useAuthStore } from '@/lib/stores/authStore';
import Router from 'next/router';
import { BASEURL } from '@/config';



export const Axios = axios.create({
  baseURL: BASEURL,
  timeout: 40000, // 40s API call timeout
});

// Helper function to get the token (handling SSR)
const getToken = () => {
  if (typeof window !== 'undefined') {
    // Access the Zustand store
    const { token } = useAuthStore.getState();
    return token;
  }
  return null;
};

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle error responses
    console.error('Error from Axios:', error);

    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized errors (e.g., token expired)
      if (status === 401) {
        // Optionally, redirect to login page
        Router.push('/login');
      }

      // Return the error response
      return Promise.reject(error.response);
    } else {
      // Handle network errors or server not responding
      console.error('Network Error or Server Not Responding');
      return Promise.reject('Network Error or Server Not Responding');
    }
  }
);

// Export Axios methods
const { get, post, put, delete: destroy } = Axios;
export { get, post, put, destroy };
