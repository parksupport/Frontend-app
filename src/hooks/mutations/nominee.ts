"use client";
import { addNominee, deleteNominee, endNomination } from "@/api/nominee";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddNominee = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

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
        //   is_indefinite: data.is_indefinite
      };
      try {
        return await addNominee(registration_number, formattedData);
      } catch (error: any) {
        throw error;
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
      console.log("Failed to add nominee:", newNominee);

       console.error("Error occurred:", mutationError);
      toast({
        title: "Failed to add Nominee",
        description:
          mutationError?.message ||
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
    //   isLoading: mutation.isLoading,
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
      user_id,
    }: {
      registration_number: string;
      user_id: string;
    }) => {
      try {
        // This function should send the registration number and user ID to the backend for deletion
        return await endNomination(registration_number, user_id);
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
