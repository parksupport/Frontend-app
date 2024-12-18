// services/api.js

import { Axios } from "@/api/axios";
import { LoginInput, LoginResponse } from "@/types"; // Define these in a types file


export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios.post('/api/token/refresh/', {
      refresh: refreshToken,
    });

    // Ensure the response is okay
    if (response.status !== 200) {
      throw new Error('Failed to refresh token');
    }

    // Save the new access token
    const data = response.data;
    localStorage.setItem('accessToken', data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error.response?.data || error.message;
  }
};




export const registerUser = async (userType, userData) => {

  console.log("data",userData)
  try {
    const response = await Axios.post(`/api/accounts/register/${userType}/`, {
      address: userData.company_registered_address,
      ...userData,
    });

    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};

export const loginUser = async (
  credentials: LoginInput
): Promise<LoginResponse> => {
  try {
    const response = await Axios.post("/api/token/", credentials);
    return response.data; // Contains access and refresh tokens
  } catch (error) {
    throw error.data || error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await Axios.get("/api/accounts/profile/");
    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};

export const passwordReset = async (userData) => {
  // try {
  //   const response = await Axios.post("/api/password_reset/", {
  //     email_address: userData.email,
  //   });
  //   return response.data; // Contains access and refresh tokens
  // } catch (error) {
  //   throw error.data || error;
  // }

  const response = await Axios.post("/api/password_reset/", {
        email_address: userData.email,
      });

  if (response.status >= 200 && response.status < 300) {
    return response.data; // Success
  }

  // Throw an error for non-2xx status codes
  throw new Error(response.data?.detail || 'Password reset failed');
};

export const confirmPasswordReset = async (userData) => {
  try {
    const response = await Axios.post("/api/change_password/", {
      uid: userData.userId,
      token: userData.token,
      new_password: userData.password,
      confirm_password: userData.confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response.data || error;
  }
};

export const verifyOtp = async ({ email_address, otp_code }) => {
  try {
    const response = await Axios.post("/api/accounts/verify-otp/", {
      email_address,
      otp_code,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
