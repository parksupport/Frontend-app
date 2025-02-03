// hooks/useSignup.ts
"use client";
import {
  confirmPasswordReset,
  loginUser,
  registerUser,
  resetPassword,
  passwordReset as sendPasswordReset,
  verifyOtp,
} from "@/api/auth"; // Make sure this is your API function for registration
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
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      setLoading(true);
      return await loginUser(credentials);
    },
    onSuccess: async (data) => {
      setLoading(true); // Start loading
      // Store token and user data
      setToken(data.access);
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUser(data.user);
      await router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorCode = error.response?.data?.code;
      if (errorCode === "not_verified") {
        const email = error.response?.data?.email;
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast({
          title: "Login Failed",
          description: "The email or password you entered is incorrect.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    },
  });

  return {
    login: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    loading,
  };
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
export const useResetPassword = () => {
  const toast = useToast();
  const mutation = useMutation<PasswordResetResponse, Error, any>({
    mutationFn: async (data) => {
      return await resetPassword(data);
    },
    onSuccess: (data) => {
      // Handle success, maybe show a success message or redirect
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
  const { mutate: changePassword, isError, error, status } = mutation;

  return { changePassword, isError, error, status };
};

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<any, any, VerifyOtpRequest>({
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

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");

    // Clear Zustand store
    setToken(null);
    setUser(null);
  };

  return { logout };
};

export const useCheckEmail = (email) => {
  return useQuery({
    queryKey: ["checkEmail", email], // Dynamic query key to refetch when email changes
    queryFn: () => checkEmail(email), // Function that performs the API call
    enabled: !!email, // Disable the query if email is not provided
    retry: false, // Disable retries (optional, for better control over error handling)
  });
};
