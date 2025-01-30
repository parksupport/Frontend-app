import { Axios } from "@/api/axios";

export const fetchTicketData = async (registration_number: string) => {
  try {
    const response = await Axios.get(
      `/api/vehicles/${registration_number}/tickets/`
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
export const fetchAllTicketData = async () => {
  try {
    const response = await Axios.get(`/api/vehicles/get-vehicles-tickets/`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching Vehicles tickets`, error);
    throw error.response?.data || error.message || error;
  }
};



export const checkTickets = async (registration_number: string) => {
  try {
    const response = await Axios.get(`/api/vehicles/check-tickets/${registration_number}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching Vehicles tickets`, error);
    throw error.response?.data || error.message || error;
  }
};

export const getCalenderInfo = async () => {
  try {
    const response = await Axios.get(`/api/vehicles/calender-info`);
    
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching Calender Info`, error);
    throw error.response?.data || error.message || error;
  }
};



