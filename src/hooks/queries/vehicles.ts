import { getCalenderInfo } from "@/api/ticket";
import { getVehicles, uploadVehicles } from "@/api/vehicle";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicles = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["vehicle"],
    queryFn: getVehicles,
    refetchOnWindowFocus: false, // Prevent unnecessary refetching
  });
  return { vehiclesData: data, error, vehicelIsLoading:isLoading, refetch };
};

export const useGetCalenderInfo = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["calender"],
    queryFn: getCalenderInfo,
    refetchOnWindowFocus: false, // Prevent unnecessary refetching
  });
  return { calenderData: data?.calendarData, error, calenderInfo:isLoading, refetch };
};

