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
  addVehicles,
  deleteVehicle,
  getVehicles,
} from "@/api/vehicle";

export const useAddVehicle = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      console.log("vehicle data", data);
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
          error?.message || "An error occurred while adding the vehicle.",
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
    isLoading: mutation.isPending,
  };
};

export const useGetVehicles = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vehicle"],
    queryFn: getVehicles,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetching
  });

  return { vehiclesData: data, error, isLoading };
};

export const useDeleteVehicle = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (vehicleId: string) => {
      return await deleteVehicle(vehicleId);
    },

    onMutate: async (vehicleId: string) => {
      await queryClient.cancelQueries({ queryKey: ["vehicle"] });

      const previousVehicles = queryClient.getQueryData(["vehicle"]);

      queryClient.setQueryData(["vehicle"], (oldData: any) => {
        return {
          ...oldData,
          vehicles: oldData?.vehicles?.filter(
            (vehicle: any) => vehicle.id !== vehicleId
          ),
        };
      });

      return { previousVehicles };
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      toast({
        title: "Vehicle deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error: any, vehicleId, context) => {
      queryClient.setQueryData(["vehicle"], context?.previousVehicles);
      toast({
        title: "Failed to delete vehicle",
        description:
          error?.message || "An error occurred while deleting the vehicle.",
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
