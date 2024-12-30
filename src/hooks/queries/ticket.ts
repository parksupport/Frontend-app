import { fetchTicketData } from "@/api/ticket";
import { useQuery } from "@tanstack/react-query";

export const useGetTicket = (registration_number: string) => {
  // Use the query hook to fetch profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["ticket", registration_number],
    queryFn: () => fetchTicketData(registration_number),
    enabled: Boolean(registration_number),
  });

  return {
    ticketsData: data,
    error,
    isLoading,
  };
};
