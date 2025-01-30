import { Axios } from "./axios";

export const addNotification = async (userData) => {
  try {
    const response = await Axios.post("/api/notifications/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 📥 **Get All Notifications**
export const getNotifications = async () => {
  try {
    const response = await Axios.get("/api/notifications/");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await Axios.post(
      `/api/notifications/${notificationId}/mark_as_read/`,
      {}
    );


    // Optionally, update the UI to reflect that the notification is marked as read
  } catch (error) {
    console.error("Error:", error);
  }
};
export const markAllAsRead = async () => {
  try {
    const response = await Axios.post(
      `/api/notifications/mark_all_as_read/`,
      {}
    );

    console.log(response.data); // Handle success
    // Optionally, update the UI to reflect that the notification is marked as read
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteNotification = async (
    id: string
  ) => {
    try {
      const response = await Axios.delete(
        `/api/notifications/${id}/`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error deleting notification data:", error);
      throw error.response?.data || error.message || error;
    }
  };
// notifications.api.ts


export const getNotificationPreferences = async () => {
  const response = await Axios.get("/api/notifications/preferences/");
  return response.data;
};

export const updateNotificationPreferences = async (data: { prefers_email: boolean; prefers_sms: boolean }) => {
  const response = await Axios.put("/api/notifications/preferences/", data);
  return response.data;
};
