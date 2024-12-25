"use client";
import { useToast } from "@chakra-ui/react";
import { updateProfileData } from "@/api/profile";
import {
  useQueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import axios from "axios";
import { useEffect } from "react";
import { addNominee, deleteNominee, getNominee } from "@/api/nominee";

export const useAddNominee = () => {
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);
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
    onMutate: async (newNominee) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: ["nominee"] });

      const previousUserData = queryClient.getQueryData(["nominee"]);

      // Ensure the existing data is properly added to and the new nominee is appended
      queryClient.setQueryData(["nominee"], (oldData: any) => {
        return {
          nominee: [
            ...(oldData?.nominee || []),
            newNominee, // Append the new nominee
          ],
        };
      });

      return { previousUserData };
    },
    onSuccess: async (updatedUserData) => {
      setUser(updatedUserData);

      const existingNomineeData = JSON.parse(
        localStorage.getItem("nomineeData") || "[]"
      );

      // const updatedNomineeData = [...(existingNomineeData || []), updatedUserData];
      const updatedNomineeData = Array.isArray(existingNomineeData)
        ? [...existingNomineeData, updatedUserData]
        : [updatedUserData]; // If it's not an array, just create a new array with the updatedUserData.

      localStorage.setItem("nomineeData", JSON.stringify(updatedNomineeData));

      queryClient.setQueryData(["nominee"], updatedUserData);
      await queryClient.invalidateQueries({ queryKey: ["nominee"] });

      toast({
        title: "User nominated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (mutationError: any, newNominee, context) => {
      console.log("Failed to add nominee:", newNominee);

      // Rollback the cache to its previous state
      queryClient.setQueryData(["nominee"], context?.previousUserData);

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

// Custom hook to fetch and cache nominees
export const useGetNominees = (registration_number: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["nominee", registration_number],
    queryFn: () => getNominee(registration_number),
    enabled: Boolean(registration_number),
  });

  return { nominees: data, error, isLoading };
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
