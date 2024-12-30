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



export const uploadVehicles = async (file) => {
  console.log("File details:", file);  // Logs file properties like name, size, etc.

  try {
    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", file);  // 'file' is the key expected by the backend

    // Send the file via POST request with FormData
    const response = await Axios.post("/api/vehicles/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Ensure the request is properly recognized
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading vehicles:", error);
    throw error.response?.data || error.message;
  }
};
