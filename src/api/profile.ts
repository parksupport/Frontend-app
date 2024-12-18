import axios from "axios";



export const updateProfileData = async (data: any, token: string) => {
  if (!token) {
    throw new Error("Authorization token is required");
  }

  try {
    console.log("Sending PATCH request to update profile...");
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

    console.log("Profile update successful:", response.data);
    return response.data;
  } catch (error: any) {
    // Log the exact error response for debugging
    console.error("Error updating profile, response data:", error.response?.data);

    // Re-throw the original Axios error for the mutationFn to handle
    throw error;
  }
};

//
