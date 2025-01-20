import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  getNotifications
} from "@/api/notification";
import { useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";

export const useNotificationPreferences = () => {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState<boolean | null>(null);

  // 1) useQuery with object syntax
  const {
    data: preferences,
    isLoading: isLoadingPrefs,
    error: prefsError,
    refetch,
  } = useQuery({
    queryKey: ["notificationPreferences"],
    queryFn: getNotificationPreferences,
  });

  // 2) useMutation with object syntax
  const {
    mutateAsync: savePreferences,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError,
  } = useMutation({
    mutationFn: (newPrefs: { prefers_email: boolean; prefers_sms: boolean }) =>
      updateNotificationPreferences(newPrefs),
    onSuccess: () => {
      setSuccess(true);
      // Invalidate so that the UI is updated with fresh data
      queryClient.invalidateQueries({ queryKey: ["notificationPreferences"] });
    },
    onError: () => {
      // Set success to false if mutation fails
      setSuccess(false);
    },


  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null); // Reset success after 10 seconds
      }, 2000); // 10 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [success]);

  return {
    preferences,
    isLoadingPrefs,
    prefsError,
    refetch,
    savePreferences,
    isSaving,
    isSaveError,
    saveError,
    success, 
  };
};

// hooks/useFetchNotifications.ts

export const useFetchNotifications = () => {
  const { data, error, isLoading,isError, refetch } = useQuery({
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
  

  // Safely handle data and format dates
  const notificationData = data
    ? data.map((notification: any) => ({
        ...notification,
        created_at: formatDate(notification.created_at), 
        time: extractTime(notification.created_at),
      }))
    : [];

  return { notificationsData: notificationData, error, isLoading,isError, refetch };
};
