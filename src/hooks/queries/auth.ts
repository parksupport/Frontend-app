import { getUserProfile } from '@/api/auth'; // Adjust the path as needed
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Hook to fetch the authenticated user's profile.
 */
export const useGetUserProfile = () => {
  const {
    data,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useQuery<any, AxiosError>({
    queryKey: ['user-profile'], // Unique query key for caching
    queryFn: getUserProfile, // Function to fetch user profile
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    retry: 1, // Retry once on failure
  });

  return {
    userProfileData: data,
    userProfileLoading,
    userProfileError,
  };
};
