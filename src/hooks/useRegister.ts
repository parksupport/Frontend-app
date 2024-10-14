// hooks/useSignup.ts
"use client";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/api/auth'; // Make sure this is your API function for registration
import { SignupInput, SignupResponse } from '@/types'; // Define types for signup

export const useSignup = () => {
  const router = useRouter();

  // The mutation function for sign-up
  const mutationFn = (userData: SignupInput): Promise<SignupResponse> => {
    return registerUser('corporate', userData); // Adjust for user type if needed
  };

  const mutation = useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: async (userData) => {
      return await registerUser('corporate', userData);
    },
    onSuccess: (data) => {
      // Redirect to OTP page with email as a query param for OTP verification
      router.push('/auth/verify-otp');
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
