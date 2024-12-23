import { Axios } from "@/api/axios";
export default async function vehicle(userData) {
  try {
    const response = await Axios.post(
      "http://localhost:8000/register/individual/",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getVehicles = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:8000/api/vehicles/get-vehicles/"
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.data || error;
  }
};
export const addVehicles = async (userData) => {
  try {
    const response = await Axios.post(
      "http://localhost:8000/api/vehicles/add/",
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
