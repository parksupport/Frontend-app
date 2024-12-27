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
import vehicle, {

} from "@/api/vehicle";
import axios from "axios";
import { useEffect } from "react";

export const useAddVehicle = () => {
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        // return await addVehicles(data);
      } catch (error: any) {
        throw error;
      }
    },
    onMutate: async (newVehicle) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: ["vehicle"] });

      const previousUserData = queryClient.getQueryData(["vehicle"]);

      queryClient.setQueryData(["vehicle"], (oldData: any) => {
        return {
          ...oldData, // Spread the old data if it exists
          vehicles: [...(oldData?.vehicles || []), newVehicle], // Safely handle undefined oldData
        };
      });

      return { previousUserData };
    },
    onSuccess: async (updatedUserData) => {
      setUser(updatedUserData);
      console.log("Updated user data:", updatedUserData);
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      queryClient.setQueryData(["vehicle"], updatedUserData);
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });

      toast({
        title: "Vehicle added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (mutationError: any, newVehicle, context) => {
      console.log("Updated user data:", newVehicle);

      // Rollback the cache to its previous state
      queryClient.setQueryData(["profile"], context?.previousUserData);

      console.error("Error occurred:", mutationError);
      toast({
        title: "Failed to add vehicle",
        description:
          mutationError?.message ||
          "An error occurred while updating the profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    addVehicle: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    //   isLoading: mutation.isLoading,
  };
};

export const useGetVehicles = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vehicle"],
    // queryFn: getVehicles,
  });

  useEffect(() => {
    if (!isLoading && data) {
      const storedUserData = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );

      const updatedUserData = {
        ...storedUserData,
        vehicles: data,
      };
      console.log("Updated  use vehicle user data:", updatedUserData);
      // Save the updated userData to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  }, [data, isLoading]); // Only run when data or isLoading changes

  return { vehicles: data, error, isLoading };
};

export const useDeleteVehicle = () => {
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (vehicleId: string) => {
      try {
        // This function should send the vehicle ID to the backend for deletion
        // return await deleteVehicle(vehicleId);
      } catch (error: any) {
        throw error;
      }
    },
    onMutate: async (vehicleId: string) => {
      // Cancel any ongoing queries for vehicles
      await queryClient.cancelQueries({ queryKey: ["vehicle"] });

      // Snapshot the previous user data
      const previousUserData = queryClient.getQueryData(["vehicle"]);

      // Optimistically update the cache with safeguards
      queryClient.setQueryData(["vehicle"], (oldData: any) => {
        const vehicles = oldData?.vehicles || [];
        return {
          ...oldData,
          vehicles: vehicles.filter((vehicle: any) => vehicle.id !== vehicleId),
        };
      });

      return { previousUserData };
    },

    onSuccess: async (data) => {
      const storedUserData = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );

      const updatedUserData = {
        ...storedUserData,
        vehicles: data,
      };
      console.log("Updated User Data: ", updatedUserData);
      setUser(updatedUserData); // Make sure this is updating the state correctly
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      queryClient.setQueryData(["vehicle"], data);
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      toast({
        title: "Vehicle deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (mutationError: any, vehicleId, context) => {
      // Rollback the cache to its previous state
      queryClient.setQueryData(["vehicle"], context?.previousUserData);

      console.error("Error occurred:", mutationError);
      toast({
        title: "Failed to delete vehicle",
        description:
          mutationError?.message ||
          "An error occurred while deleting the vehicle.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    deleteVehicle: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    // isLoading: mutation.isLoading,
  };
};
