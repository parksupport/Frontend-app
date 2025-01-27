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


export const downloadCSV = async () => {
  try {

    const response = await Axios.get('/api/vehicles/download-csv/', {
      responseType: 'blob', // Important to handle binary data
    });

    // Get the CSV content as a blob
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vehicle_data.csv'); // Name of the file

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    // Handle errors
    throw error.response?.data || error.message;
  }
};



