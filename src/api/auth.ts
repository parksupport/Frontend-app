// services/api.js

import {Axios} from '@/api/axios';
import { LoginInput, LoginResponse } from '@/types'; // Define these in a types file

export const registerUser = async (userType, userData) => {
  try {
    const response = await Axios.post(`/api/accounts/register/${userType}/`, userData);
    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};

export const loginUser = async (credentials: LoginInput): Promise<LoginResponse> => {
  try {
    const response = await Axios.post('/api/token/', credentials);
    return response.data; // Contains access and refresh tokens
  } catch (error) {
    throw error.data || error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await Axios.get('/api/accounts/profile/');
    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};
