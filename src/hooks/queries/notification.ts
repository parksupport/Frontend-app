import { getNotifications } from "@/api/notification";
import { useQuery } from "@tanstack/react-query";

export const useGetNotifications = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  function formatDate(timestamp: string) {
    // Convert to Date object
    const date = new Date(timestamp);

    // Format the date as "03 January"
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  function extractTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  
  const time = extractTime("2025-01-03T09:19:59.425588Z");

  // Safely handle data and format dates
  const notificationData = data
    ? data.map((notification: any) => ({
        ...notification,
        created_at: formatDate(notification.created_at), 
        time: extractTime(notification.created_at),
      }))
    : [];

  return { notificationsData: notificationData, error, isLoading, refetch };
};
