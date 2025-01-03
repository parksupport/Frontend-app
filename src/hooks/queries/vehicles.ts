import { getVehicles, uploadVehicles } from "@/api/vehicle";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicles = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["vehicle"],
    queryFn: getVehicles,
    refetchOnWindowFocus: false, // Prevent unnecessary refetching
  });
  return { vehiclesData: data, error, isLoading, refetch };
};

