import subscribePlan from "@/api/subscription";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubscribe = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (plan_id: any) => {
        return await subscribePlan(plan_id);
      },
  
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });  
        toast({
          title: "Subscription successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
  
      onError: (error: any) => {
        console.error("Error subscribing:", error);
        toast({
          title: "Failed to subcribe",
          description:
            error?.error || "An error occurred while subscribing a plan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  
    return {
      subscribe: mutation.mutate,
      isError: mutation.isError,
      error: mutation.error,
      isLoading: mutation.isPending,
    };
  };