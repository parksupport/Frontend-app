import { Axios } from "@/api/axios";


export const getNominee = async (registration_number: string) => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/vehicles/${registration_number}/get-nominations/`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching nominee data:", error);
      throw error.response?.data || error.message || error;
    }
  };

export const addNominee = async (registration_number,userData) => {
  try {
    const response = await Axios.post(
    `http://localhost:8000/api/vehicles/${registration_number}/nominations/`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};

export const deleteVehicle = async (registration_number) => {
  try {
    const response = await Axios.delete(
      `http://localhost:8000/api/vehicles/${registration_number}/delete/`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
