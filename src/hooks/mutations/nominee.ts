"use client";
import { addNominee, deleteNominee, editNominee, endNomination } from "@/api/nominee";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAddNominee = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const mutation = useMutation({
    mutationFn: async ({
      data,
      registration_number,
    }: {
      data: any;
      registration_number: string;
    }) => {
      const formattedData = {
        name: data.name,
        email: data.email_address,
        phone: data.phone_number,
        start_date: data.start_date,
        end_date: data.end_date,
        notification_preference: data.notification_preference,
      };

      setIsLoading(true); // Set loading to true when the mutation starts
      try {
        const response = await addNominee(registration_number, formattedData);
        return response;
      } catch (error: any) {
        throw error;
      } finally {
        setIsLoading(false); // Set loading to false when the mutation completes
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["nominee"] });
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });

      toast({
        title: "User nominated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (mutationError: any, newNominee, context) => {
      toast({
        title: "Failed to add Nominee",
        description:
          mutationError?.error ||
          "An error occurred while adding the nominee.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    addNominee: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    addNomineeLoading: isLoading || mutation.isPending, // Combine local and mutation loading states
  };
};
export const useDeleteNominee = () => {
  const toast = useToast();
  // const setNominee = useAuthStore((state) => state.setNominee);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      registration_number,
      user_id,
    }: {
      registration_number: string;
      user_id: string;
    }) => {
      try {
        // This function should send the registration number and user ID to the backend for deletion
        return await deleteNominee(registration_number, user_id);
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the cache for nominees to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["nominee"] });

      // Show a success toast
      toast({
        title: "Nominee deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      // Show an error toast
      toast({
        title: "Error deleting nominee.",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    deleteNominee: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    // isLoading: mutation.isLoading,
  };
};



export const useEndNomination = () => {
  const toast = useToast();
  // const setNominee = useAuthStore((state) => state.setNominee);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      registration_number,
      nominee_id,
    }: {
      registration_number: string;
      nominee_id: string;
    }) => {
      try {
        // This function should send the registration number and user ID to the backend for deletion
        return await endNomination(registration_number, nominee_id);
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the cache for nominees to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["nominee"] });

      // Show a success toast
      toast({
        title: "End nomination successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      // Show an error toast
      toast({
        title: "Error ending nomination",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    endNomination: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    // isLoading: mutation.isLoading,
  };
};


export const useEditNomination = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      nominee_id,
      updatedData,
    }: {
      nominee_id: number;
      updatedData: any;
    }) => {
      try {
        setIsLoading(true);
        return await editNominee(nominee_id, updatedData);
      } catch (error: any) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nominee"] });

      // toast({
      //   title: "Nominee updated successfully.",
      //   status: "success",
      //   duration: 3000,
      //   isClosable: true,
      // });
    },
    onError: (error: any) => {
      // toast({
      //   title: "Error updating nominee",
      //   description: error?.response?.data?.message || "Something went wrong.",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
    },
  });

  return {
    editNomination: mutation.mutate,
    isLoading,
    status: mutation.status,
    isError: mutation.isError,
    error: mutation.error,
  };
};
