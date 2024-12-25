import { Axios } from "@/api/axios";

export const getNominee = async (registration_number: string) => {
  try {
    const response = await Axios.get(`/api/vehicles/${registration_number}/get-nominations/`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching nominee data:", error);
    throw error.response?.data || error.message || error;
  }
};

export const addNominee = async (registration_number: string, userData: any) => {
  try {
    const response = await Axios.post(`/api/vehicles/${registration_number}/nominations/`, userData);
    return response.data;
  } catch (error: any) {
    console.error("Error adding nominee:", error);
    throw error.response?.data || error.message || error;
  }
};

