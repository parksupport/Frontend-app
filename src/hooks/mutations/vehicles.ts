"use client";
import { getCalenderInfo } from "@/api/ticket";
import { addVehicles, deleteVehicle, uploadVehicles, verify_Vehicle, } from "@/api/vehicle";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadVehicles = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Mutation hook to handle the file upload
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      return await uploadVehicles(file);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      await queryClient.invalidateQueries({ queryKey: ["nominees"] });

      toast({
        title: "Vehicles uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error: any) => {
      console.error("Error uploading vehicles:", error);
      toast({
        title: "Failed to upload vehicles",
        description:
          error?.error || "An error occurred while uploading the vehicles.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const isLoading = mutation.status === "pending";
  return {
    uploadVehicles: mutation.mutate,
    isLoading,
    error: mutation.error,
    status:mutation.status
  };
};

export const useAddVehicle = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await addVehicles(data);
    },

    onSuccess: async () => {
      // Invalidate and refetch the 'vehicle' query after adding
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });

      toast({
        title: "Vehicle added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error: any) => {
      console.error("Error adding vehicle:", error);
      toast({
        title: "Failed to add vehicle",
        description:
          error?.error || "An error occurred while adding the vehicle.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    // addVehicle: mutation.mutate,
    addVehicle: mutation.mutateAsync,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
  };
};


export const useVerifyVehicle = () => {

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await verify_Vehicle(data);
    },

    onSuccess: async () => {
      // Invalidate and refetch the 'vehicle' query after adding
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });

      toast({
        title: "Vehicle verification successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error: any) => {
      console.error("Error verifiying vehicle:", error);
      toast({
        title: "Failed to verify vehicle",
        description:
          error?.error || "An error occurred while adding the vehicle.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    verifyVehicle: mutation.mutateAsync,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
    status:mutation.status
  };
};





export const useDeleteVehicle = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (vehicleId: string) => {
      try {
        return await deleteVehicle(vehicleId);
      } catch (error: any) {
        throw error;
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      await queryClient.invalidateQueries({ queryKey: ["nominee"] });
    
  
    
      toast({
        title: "Vehicle deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    

    onError: (error: any) => {
      toast({
        title: "Failed to delete vehicle",
        description:
          error?.error || "An error occurred while deleting the vehicle.",
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
    isLoading: mutation.isPending,
  };
};

