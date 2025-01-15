import { Axios } from "@/api/axios";

export const getNominee = async (registration_number: string) => {
  try {
    const response = await Axios.get(
      `/api/vehicles/${registration_number}/get-nominations/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching nominee data:", error);
    throw error.response?.data || error.message || error;
  }
};

export const getAllNominee = async () => {
  try {
    const response = await Axios.get(
      `/api/vehicles/get-all-nominations/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching nominee data:", error);
    throw error.response?.data || error.message || error;
  }
};

export const addNominee = async (
  registration_number: string,
  userData: any
) => {
  try {
    const response = await Axios.post(
      `/api/vehicles/${registration_number}/nominations/`,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding nominee:", error);
    throw error.response?.data || error.message || error;
  }
};

export const deleteNominee = async (
  registration_number: string,
  user_id: string
) => {
  try {
    const response = await Axios.delete(
      `/api/vehicles/${registration_number}/nominations/${user_id}/delete/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error deleting nominee data:", error);
    throw error.response?.data || error.message || error;
  }
};

export const endNomination = async (
  registration_number: string,
  nominee_id: string
) => {
  try {
    const response = await Axios.patch(
      `/api/vehicles/${registration_number}/nominations/${nominee_id}/end-nomination/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error ending nomination:", error);
    throw error.response?.data || error.message || error;
  }
};
