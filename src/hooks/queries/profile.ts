// import { fetchProfileData } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";


export const useGetProfile = () => {
  // Use the query hook to fetch profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"], // Pass the query key as an array
    // queryFn: fetchProfileData, // Pass the query function to fetch the data
  });

  return {
    data,
    error,
    isLoading,
  };
};