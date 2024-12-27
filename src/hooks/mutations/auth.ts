// hooks/useSignup.ts
"use client";
import {
  confirmPasswordReset,
  loginUser,
  refreshAccessToken,
  registerUser,
  passwordReset as sendPasswordReset,
  verifyOtp,
} from "@/api/auth"; // Make sure this is your API function for registration
import { updateProfileData } from "@/api/profile";
import { checkEmail } from "@/api/register";
import { useAuthStore } from "@/lib/stores/authStore";
import {
  ForgotPasswordInput,
  LoginInput,
  LoginResponse,
  PasswordResetResponse,
  SignupInput,
  SignupResponse,
  VerifyOtpRequest,
} from "@/types"; // Define types for signup
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const mutation = useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      setLoading(true);
      return await loginUser(credentials);
    },
    onSuccess: async (data) => {
      console.log(data.user, "data.user");
      setLoading(true); // Start loading
      // Store token in localStorage
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userData", JSON.stringify(data.user));
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
        toast({
          title: "Login Failed",
          description: "The email or password you entered is incorrect.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error.response?.data?.detail || "Login failed");
        setLoading(false);
      }
    },
  });
  const { mutate: login, isError, error } = mutation;

  return { login, isError, error, loading };
};

export const useForgotPassword = () => {
  const toast = useToast();
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
      toast({
        title: "Password reset link sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Password reset failed",
        description:
          error?.data?.message || "Email does not exist.Try another one",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
  const router = useRouter();
  const toast = useToast();
  const mutation = useMutation<PasswordResetResponse, Error, any>({
    mutationFn: async (data) => {
      return await confirmPasswordReset(data);
    },
    onSuccess: (data) => {
      // Handle success, maybe show a success message or redirect
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/auth/login");
    },
    onError: (error: any) => {
      toast({
        title: "Password change failed",
        description: error?.data?.message || "Link expired",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Destructure the mutation object for return
  const { mutate: confirmPassword, isError, error, status } = mutation;

  return { confirmPassword, isError, error, status };
};

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<any, Error, VerifyOtpRequest>({
    mutationFn: async ({ email_address, otp }) => {
      return await verifyOtp({ email_address, otp_code: otp });
    },

    onSuccess: async (data) => {
      setLoading(true); // Start loading
      try {
        setToken(data.access);

        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Set the fetched user profile in the store
        setUser(data.user);

        // Navigate to the dashboard
        await router.push("/dashboard");
      } catch (error) {
        console.error(
          "Error fetching profile data after OTP verification:",
          error
        );
      } finally {
        setLoading(false); // Stop loading
      }
    },
    onError: (error: any) => {
      console.error(
        "OTP Verification failed:",
        error.response?.data || error.message || error
      );
      setLoading(false); // Stop loading in case of an error
    },
  });

  const { mutate: verifyOtpMutate, isError, error, isPending } = mutation;
  return { verifyOtp: verifyOtpMutate, isError, error, isPending, loading };
};

export const useLogout = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const logout = () => {
    // Remove token and profile from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("profile"); // Adjust the key based on your actual storage key for the profile
    localStorage.removeItem("refreshToken"); // Adjust the key based on your actual storage key for the profile

    // Clear Zustand state
    setToken(null);
    setUser(null);

    // Redirect to login or home page
    router.push("/auth/login"); // Adjust path as needed
  };

  return { logout };
};

// Fetch profile data from the API
const fetchProfileData = async () => {};

export const useProfile = () => {
  // Use the query hook to fetch profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"], // Pass the query key as an array
    queryFn: fetchProfileData, // Pass the query function to fetch the data
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useCheckEmail = (email) => {
  return useQuery({
    queryKey: ["checkEmail", email], // Dynamic query key to refetch when email changes
    queryFn: () => checkEmail(email), // Function that performs the API call
    enabled: !!email, // Disable the query if email is not provided
    retry: false, // Disable retries (optional, for better control over error handling)
  });
};

export const useEditProfile = () => {
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser); // Function to update user in global store
  const queryClient = useQueryClient(); // Ensure you have access to React Query's client
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      let token = localStorage.getItem("authToken");

      try {
        console.log("Attempting profile update with data:", data);
        // Attempt the profile update
        return await updateProfileData(data, token);
      } catch (error: any) {
        console.error("Error during profile update:", error);

        // Check if the error is due to an expired token
        if (error?.response?.status === 401) {
          console.log("Token expired. Attempting to refresh...");
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              console.log("Refreshing access token...");
              // Refresh the access token
              const newAccessToken = await refreshAccessToken(refreshToken);
              console.log("Access token refreshed:", newAccessToken);

              // Store the new token for subsequent requests
              localStorage.setItem("authToken", newAccessToken);
              token = newAccessToken;

              // Retry the profile update with the new token
              return await updateProfileData(data, token);
            } catch (refreshError) {
              router.push("/auth/login"); // Adjust path as needed
              console.error("Failed to refresh token:", refreshError);
              throw new Error("Unable to refresh token. Please log in again.");
            }
          } else {
            router.push("/auth/login"); // Adjust path as needed
            console.error(
              "No refresh token available. Redirecting to login..."
            );
            throw new Error("Session expired. Please log in again.");
          }
        }

        // Re-throw other errors
        throw error;
      }
    },

    onMutate: (variables) => {
      // Optimistically update the profile data
      queryClient.setQueryData(["profile"], (oldData: any) => ({
        ...oldData,
        ...variables,
      }));
    },

    onSuccess: async (data) => {
      try {
        // Update user state in the global store
        setUser(data);

        // Update localStorage with the new user data
        localStorage.setItem("userData", JSON.stringify(data));

        // Ensure React Query's cache is updated with the latest profile data
        queryClient.setQueryData(["profile"], data);

        console.log("Profile updated successfully:", data);

        // Optional: Invalidate queries to ensure fresh data is fetched
        await queryClient.invalidateQueries({ queryKey: ["profile"] });

        // Show success toast
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error handling success:", error);
      }
    },

    onError: (mutationError: any) => {
      console.error("Error occurred:", mutationError);
      toast({
        title: "Failed to update profile",
        description:
          mutationError?.message ||
          "An error occurred while updating the profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Extracting the mutate function and states
  const { mutate: updateProfile, isError, error } = mutation;

  return { updateProfile, isError, error };
};
