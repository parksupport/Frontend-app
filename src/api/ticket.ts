import { Axios } from "@/api/axios";

export const fetchTicketData = async (registration_number: string) => {
  try {
    const response = await Axios.get(
      `/api/vehicles/${registration_number}/get-nominations/`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching Ticket for vehicle ${registration_number} data`,
      error
    );
    throw error.response?.data || error.message || error;
  }
};



async function syncTickets(registrationNumber) {
    try {
      const response = await Axios.post(`/sync-vehicle-tickets/${registrationNumber}/`);
      return response.data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error.response?.data || error.message || error;
    }
  }
  