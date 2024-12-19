import axios from "axios";
import { BASEURL } from "@/config";
import { useAuthStore } from "@/lib/stores/authStore";

// Create Axios instance
export const Axios = axios.create({
  baseURL: BASEURL,
  timeout: 40000,
});

// Helper function to get the current token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Refresh token logic
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Refresh token not found.");

  try {
    const response = await axios.post(`${BASEURL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("authToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Unable to refresh token. Please log in again.");
  }
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
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios.request(error.config); // Retry the original request
        } catch (refreshError) {
          console.error("Token refresh failed. Clearing auth state.");
          const authStore = useAuthStore.getState();
          authStore.logout(); // Clear state and let the HOC handle redirection
          return Promise.reject(refreshError);
        }
      }
    }

    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

const { get, post, put, patch, delete: destroy } = Axios;
export { get, post, put, patch, destroy };
