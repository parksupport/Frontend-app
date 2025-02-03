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
  const transformed = data?.calendarData?.map((dayItem: any) => ({
    // Convert the string into a Date object
    date: new Date(dayItem.date),

    // Convert tickets array -> array of strings (or your preferred object)
    // Right now you have multiple tickets, so let's store them as strings:
    events: dayItem.tickets.map((ticket: any) =>
      `Ticket #${ticket.ticket_id} - Due: ${ticket.due_date}`
    ),
  }));
  return { calenderData: transformed, error, calenderInfo:isLoading, refetch };
};

