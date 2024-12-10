// services/api.js

import { Axios } from "@/api/axios";
import { LoginInput, LoginResponse } from "@/types"; // Define these in a types file

export const registerUser = async (userType, userData) => {
  try {
    const response = await Axios.post(
      `/api/accounts/register/${userType}/`,
      userData
    );
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
  try {
    const response = await Axios.post("/api/password_reset/", {
      email_address: userData.email,
    });
    return response.data; // Contains access and refresh tokens
  } catch (error) {
    throw error.data || error;
  }
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
    const response = await Axios.post('/api/accounts/verify-otp/', {
      email_address,
      otp_code,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
