// notifications.api.ts

import { Axios } from "@/api/axios";

export const getNotifications = async () => {
  const response = await Axios.get("/api/notifications/");
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number) => {
  const response = await Axios.post(`/api/notifications/${notificationId}/mark_as_read/`);
  return response.data;
};

export const getNotificationPreferences = async () => {
  const response = await Axios.get("/api/notifications/preferences/");
  return response.data;
};

export const updateNotificationPreferences = async (data: { prefers_email: boolean; prefers_sms: boolean }) => {
  const response = await Axios.post("/api/notifications/preferences/", data);
  return response.data;
};
