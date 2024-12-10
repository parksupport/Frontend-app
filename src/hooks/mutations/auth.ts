// hooks/useSignup.ts
"use client";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser,confirmPasswordReset, passwordReset as sendPasswordReset,verifyOtp } from '@/api/auth'; // Make sure this is your API function for registration
import { SignupInput, SignupResponse,ForgotPasswordInput, PasswordResetResponse, LoginInput, LoginResponse,VerifyOtpRequest} from '@/types'; // Define types for signup
import { useAuthStore } from '@/lib/stores/authStore';


export const useSignup = (value:string) => {
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
      const errorMessage = error.response?.data?.detail || 'Signup failed';
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
        // Assume data contains access token and user info
        setToken(data.access);
        setUser(data.user); // Adjust based on your API response
        router.push('/dashboard'); // Redirect after successful login
      },
      onError: (error: any) => {
        // Handle error
        const errorMessage = error.response?.data?.detail || 'Login failed';
        console.error(errorMessage);
      },
    });
    const { mutate: login,  isError, error } = mutation;
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
      status
    } = mutation;
  
    return { resetPassword,  isError, error ,status};
  };
  
export const useConfirmPassword = () => {
    const mutation = useMutation<
    PasswordResetResponse,
      Error,
      any
    >({
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
    const {
      mutate: confirmPassword,
      isError,
      error,
      status
    } = mutation;
  
    return { confirmPassword, isError, error ,status};
  };

export const useVerifyOtp = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<any, Error, VerifyOtpRequest>({
    mutationFn: async ({ email_address, otp }) => {
      return await verifyOtp({ email_address, otp_code:otp });
    },
    onSuccess: (data) => {
      setToken(data.access);
      setUser(data.user);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('OTP Verification failed:', error.response?.data || error.message || error);
    },
  });

  const { mutate: verifyOtpMutate, isError, error, isPending } = mutation;
  return { verifyOtp: verifyOtpMutate, isError, error, isPending};
};

  


