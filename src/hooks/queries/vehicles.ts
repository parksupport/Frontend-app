import { getVehicles } from "@/api/vehicle";
import { useQuery } from "@tanstack/react-query";




export const useGetVehicles = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["vehicle"],
      queryFn: getVehicles,
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Prevent unnecessary refetching
    });
  
    return { vehiclesData: data, error, isLoading };
  };
  