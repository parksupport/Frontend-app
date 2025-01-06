"use client";
import { useToast } from "@chakra-ui/react";
import { updateProfileData} from "@/api/profile";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

export const useEditProfile = () => {
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
 
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        return await updateProfileData(data);
      } catch (error: any) {
        throw error;
      }
    },
    onMutate: (variables) => {
      queryClient.setQueryData(["profile"], (oldData: any) => ({
        ...oldData,
        ...variables,
      }));
    },
    onSuccess: async (data) => {
      setUser(data);
      localStorage.setItem("userData", JSON.stringify(data));
      queryClient.setQueryData(["profile"], data);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (mutationError: any) => {
      console.error("Error occurred:", mutationError);
      toast({
        title: "Failed to update profile",
        description: mutationError?.message || "An error occurred while updating the profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return { updateProfile: mutation.mutate, isError: mutation.isError, error: mutation.error };
};
