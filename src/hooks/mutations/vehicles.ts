"use client";
import { useToast } from "@chakra-ui/react";
import { updateProfileData} from "@/api/profile";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { addVehicles } from "@/api/vehicle";


export const useAddVehicle = () => {
    const toast = useToast();
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (data: any) => {
        let token = localStorage.getItem("authToken");
        try {
          // This function should send the new vehicle data to the backend and return the updated user data
          return await addVehicles(data);
        } catch (error: any) {
          throw error;
        }
      },
      onMutate: async (newVehicle) => {
        // Optimistically update the cache
        await queryClient.cancelQueries({ queryKey: ["profile"] });

  
        const previousUserData = queryClient.getQueryData(["profile"]);
  
        queryClient.setQueryData(["profile"], (oldData: any) => {
          return {
            ...oldData,
            vehicles: [...(oldData.vehicles || []), newVehicle],
          };
        });
  
        return { previousUserData };
      },
      onSuccess: async (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
  
        queryClient.setQueryData(["profile"], updatedUserData);
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
  
        toast({
          title: "Vehicle added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (mutationError: any, newVehicle, context) => {
        // Rollback the cache to its previous state
        queryClient.setQueryData(["profile"], context?.previousUserData);
  
        console.error("Error occurred:", mutationError);
        toast({
          title: "Failed to add vehicle",
          description: mutationError?.message || "An error occurred while updating the profile.",
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
  
  