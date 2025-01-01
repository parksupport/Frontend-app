import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  getNotifications
} from "@/api/notification";

export const useNotificationPreferences = () => {
  const queryClient = useQueryClient();

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
      // Invalidate so that the UI is updated with fresh data
      queryClient.invalidateQueries({ queryKey: ["notificationPreferences"] });
    },
  });

  return {
    preferences,
    isLoadingPrefs,
    prefsError,
    refetch,
    savePreferences,
    isSaving,
    isSaveError,
    saveError,
  };
};

// hooks/useFetchNotifications.ts

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};
