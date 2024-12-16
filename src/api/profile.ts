import axios from "axios";



export const updateProfileData = async (data: any, token: string) => {
  if (!token) {
    throw new Error("Authorization token is required");
  }

  try {
    // Update only the full_name but pass the entire data object
    const response = await axios.patch(
      `http://localhost:8000/api/accounts/profile/${data.id}/`,
      {
        full_name: data.name,
        ...data,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return response.data; 
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};
//
