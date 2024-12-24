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
import { addNominee, getNominee } from "@/api/nominee";

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

      queryClient.setQueryData(["nominee"], (oldData: any) => {
        return {
          nominee: [...(oldData?.nominee || []), newNominee],
        };
      });

      return { previousUserData };
    },
    onSuccess: async (updatedUserData) => {
      setUser(updatedUserData);
      console.log("Updated user data:", updatedUserData);
      localStorage.setItem("nomineeData", JSON.stringify(updatedUserData));

      queryClient.setQueryData(["nominee"], updatedUserData);
      await queryClient.invalidateQueries({ queryKey: ["nominee"] });

      toast({
        title: "user nominated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (mutationError: any, newNominee, context) => {
      console.log("Updated user data:", newNominee);

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
    const {
      data: nominees,
      error,
      isLoading,
    } = useQuery({
      queryKey: ["nominee", registration_number], // Use a unique key per registration number
      queryFn: () => getNominee(registration_number), // Pass the registration number to the query function
      enabled: !!registration_number, // Only fetch when registration_number is provided
    });
  
    useEffect(() => {
      if (!isLoading && nominees) {
        // Save the updated data to localStorage
        localStorage.setItem("nomineeData", JSON.stringify(nominees));
      }
    }, [nominees, isLoading]);
  
    return { nominees, error, isLoading };
  };