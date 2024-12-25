import { Axios } from "@/api/axios";

// 🚗 **Register Vehicle**
export default async function vehicle(userData) {
  try {
    const response = await Axios.post("/register/individual/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

// 📥 **Get All Vehicles**
export const getVehicles = async () => {
  try {
    const response = await Axios.get("/api/vehicles/get-vehicles/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 🛠️ **Add Vehicle**
export const addVehicles = async (userData) => {
  try {
    const response = await Axios.post("/api/vehicles/add/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 🗑️ **Delete Vehicle**
export const deleteVehicle = async (registration_number) => {
  try {
    const response = await Axios.delete(
      `/api/vehicles/${registration_number}/delete/`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
