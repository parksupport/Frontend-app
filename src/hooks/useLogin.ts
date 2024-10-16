// hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/stores/authStore';
import { loginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { LoginInput, LoginResponse } from '@/types'; // Import your types

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();


  // The mutation function
  const mutationFn = (credentials: LoginInput): Promise<LoginResponse> => {
    return loginUser(credentials);
  };
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


