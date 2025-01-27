import {  checkTickets, fetchAllTicketData, fetchTicketData } from "@/api/ticket";
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

export const useGetAllTicket = () => {
  // Use the query hook to fetch profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchAllTicketData(),
    
  });

  return {
    ticketsData: data,
    error,
    isLoading
  };
};

export const useCheckVehicleTicket = (registrationNumber: string) => {
  const { data, error, isLoading,refetch } = useQuery({
    queryKey: ["check-ticket", registrationNumber],
    queryFn: () => checkTickets(registrationNumber),
    enabled: Boolean(registrationNumber), // Ensures query only runs if registrationNumber exists
  });

  return {
    hasTicket: data?.has_tickets ?? null, // Extract hasTicket from API response
    error,
    isLoading,
    refetch
  };
}

