import {
  addNotification,
  deleteNotification,
  markAllAsRead,
  markAsRead,
} from "@/api/notification";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await addNotification(data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });

      toast({
        title: "Add Notification successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error: any) => {
      console.error("Error adding Notification:", error);
      toast({
        title: "Failed to add vehicle",
        description:
          error?.message || "An error occurred while adding the vehicle.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    addNotification: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
  };
};

export const useMarkRead = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await markAsRead(data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error: any) => {
      console.error("Mark as read failed", error);
    },
  });

  return {
    markAsRead: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
  };
};

export const useMarkAllRead = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await markAllAsRead();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error: any) => {
      console.error("Mark all as  read failed", error);
    },
  });

  return {
    markAllAsRead: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
  };
};

export const useDeleteNotification = () => {
  const toast = useToast();
  // const setNominee = useAuthStore((state) => state.setNominee);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        // This function should send the registration number and user ID to the backend for deletion
        return await deleteNotification(id);
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the cache for nominees to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      // Show a success toast
      toast({
        title: "Notification deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      // Show an error toast
      toast({
        title: "Error deleting notificaiton.",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    deleteNotification: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    // isLoading: mutation.isLoading,
  };
};
