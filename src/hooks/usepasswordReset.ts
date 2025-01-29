// hooks/useForgotPassword.ts
import { confirmPasswordReset, passwordReset as sendPasswordReset } from "@/api/auth"; // Function to call your API
import { ForgotPasswordInput, PasswordResetResponse, changePasswordInput } from "@/types"; // Import your types
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

export const useForgotPassword = () => {
    const mutationFn = (
      data: ForgotPasswordInput
    ): Promise<PasswordResetResponse> => {
      return sendPasswordReset(data);
    };
  
    const mutation = useMutation<
    PasswordResetResponse,
      Error,
      ForgotPasswordInput
    >({
      mutationFn: async (data) => {
        return await sendPasswordReset(data);
      },
      onSuccess: (data) => {
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
    const router = useRouter();

    const mutationFn = (
      data: changePasswordInput
    ): Promise<PasswordResetResponse> => {
  
      return confirmPasswordReset(data);
    };
  
    const mutation = useMutation<
    PasswordResetResponse,
      Error,
      any
    >({
      mutationFn: async (data) => {
        return await confirmPasswordReset(data);
      },
      onSuccess: (data) => { 
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
  