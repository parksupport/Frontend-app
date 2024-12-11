// hooks/useSignup.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  confirmPasswordReset,
  passwordReset as sendPasswordReset,
  verifyOtp,
} from "@/api/auth"; // Make sure this is your API function for registration
import {
  SignupInput,
  SignupResponse,
  ForgotPasswordInput,
  PasswordResetResponse,
  LoginInput,
  LoginResponse,
  VerifyOtpRequest,
} from "@/types"; // Define types for signup
import { useAuthStore } from "@/lib/stores/authStore";
import axios from "axios";
import { updateProfileData } from "@/api/profile";
import queryClient from "@/lib/tanstack-query/queryClient";

export const useSignup = (value: string) => {
  const router = useRouter();

  // The mutation function for sign-up

  const mutation = useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: async (userData) => {
      return await registerUser(value, userData);
    },
    onSuccess: (data) => {
      // Redirect to OTP page with email as a query param for OTP verification
    },
    onError: (error: any) => {
      // Handle error
      const errorMessage = error.response?.data?.detail || "Signup failed";
      console.error(errorMessage);
    },
  });

  // Destructure the mutation object for return
  const { mutate: signup, isError, error } = mutation;

  return { signup, isError, error };
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      return await loginUser(credentials);
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem("authToken", data.access);

      // Save token and user info in Zustand
      setToken(data.access);
      setUser(data.user);

      // Redirect to dashboard
      router.push("/dashboard");
    },

    onError: (error: any) => {
      // Check if the error code is 'not_verified'
      const errorCode = error.response?.data?.code;
      if (errorCode === "not_verified") {
        const email = error.response?.data?.email; // Extract email if available
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        // Log or handle other errors
        console.error(error.response?.data?.detail || "Login failed");
      }
    },
  });
  const { mutate: login, isError, error } = mutation;

  // return { login, isError, error };
  return { login, isError, error };
};

export const useForgotPassword = () => {
  const mutation = useMutation<
    PasswordResetResponse,
    Error,
    ForgotPasswordInput
  >({
    mutationFn: async (data) => {
      return await sendPasswordReset(data);
    },
    onSuccess: (data) => {
      // Handle success, maybe show a success message or redirect
      console.log("Password reset link sent successfully", data);
    },
    onError: (error: any) => {
      // Handle error
      const errorMessage =
        error.response?.data?.detail || "Password reset failed";
      console.error(errorMessage);
    },
  });

  // Destructure the mutation object for return
  const {
    mutate: resetPassword,

    isError,
    error,
    status,
  } = mutation;

  return { resetPassword, isError, error, status };
};

export const useConfirmPassword = () => {
  const mutation = useMutation<PasswordResetResponse, Error, any>({
    mutationFn: async (data) => {
      return await confirmPasswordReset(data);
    },
    onSuccess: (data) => {
      // Handle success, maybe show a success message or redirect
      console.log("Password changed successfully", data);
    },
    onError: (error: any) => {
      // Handle error
      const errorMessage =
        error.response?.data?.detail || "Password change failed";
      console.error(errorMessage);
    },
  });

  // Destructure the mutation object for return
  const { mutate: confirmPassword, isError, error, status } = mutation;

  return { confirmPassword, isError, error, status };
};

export const useVerifyOtp = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<any, Error, VerifyOtpRequest>({
    mutationFn: async ({ email_address, otp }) => {
      return await verifyOtp({ email_address, otp_code: otp });
    },
    onSuccess: (data) => {
      setToken(data.access);
      setUser(data.user);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error(
        "OTP Verification failed:",
        error.response?.data || error.message || error
      );
    },
  });

  const { mutate: verifyOtpMutate, isError, error, isPending } = mutation;
  return { verifyOtp: verifyOtpMutate, isError, error, isPending };
};

export const useLogout = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setEmail = useAuthStore((state) => state.setEmail);
  const router = useRouter();

  const logout = () => {
    // Remove token and profile from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("profile"); // Adjust the key based on your actual storage key for the profile

    // Clear Zustand state
    setToken(null);
    setUser(null);
    setEmail("");

    // Redirect to login or home page
    router.push("/auth/login"); // Adjust path as needed
  };

  return { logout };
};

// Fetch profile data from the API
const fetchProfileData = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Get token from localStorage or state
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      "http://localhost:8000/api/accounts/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the profile data from the response
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error; // Re-throw error for query to handle
  }
};

export const useProfile = () => {
  // Use the query hook to fetch profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"], // Pass the query key as an array
    queryFn: fetchProfileData, // Pass the query function to fetch the data
  });

  return {
    data, // The profile data
    error, // Error if any
    isLoading, // Loading state
  };
};

export const useEditProfile = () => {
  const token = localStorage.getItem("authToken");

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await updateProfileData(data, token);
    },
    onMutate: (variables) => {
      // Optimistically update the profile data
      queryClient.setQueryData("profile", (oldData) => ({
        ...oldData,
        ...variables,
      }));
    },
    onSuccess: async (data) => {
      console.log("Pro;file updated successfully:", data)
      // Refetch profile data if needed
      await queryClient.invalidateQueries("profile");
    },
    onError: (mutationError: any) => {
      console.error(mutationError);
    },
  });

  // Destructuring mutation to get the mutate function and states
  const { mutate: updateProfile, isError, error } = mutation;

  return { updateProfile, isError, error };
};
