// services/profileService.ts

import { Axios } from "@/api/axios";



export const updateProfileData = async (data: any) => {
  try {
    const response = await Axios.patch(`/api/accounts/profile/${data.id}/`, {
      full_name: data.name,
      ...data,
    });

    console.log("Profile update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};


export const fetchProfileData = async () => {
  try {
    const response = await Axios.get("/api/accounts/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error.response?.data || error.message);
    throw error;
  }
};


//
