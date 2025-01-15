import { getAllNominee, getNominee } from "@/api/nominee";
import { useQuery } from "@tanstack/react-query";



export const useGetNominees = (registration_number: string) => {
    const { data, error, isLoading ,refetch} = useQuery({
      queryKey: ["nominee", registration_number],
      queryFn: () => getNominee(registration_number),
      enabled: Boolean(registration_number),
    });
  
    return { nominees: data, error, isLoading ,refetch};
  };



export const useGetAllNominees = () => {
    const { data, error, isLoading ,refetch} = useQuery({
      queryKey: ["allNominee"],
      queryFn: () => getAllNominee(),
    });
  
    return { allNominees: data, error, isLoading ,refetch};
  };






// export const useGetNominees = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   const mutation = useMutation({
//     mutationFn: (registration_number: string) => getNominee(registration_number),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["nominee"] });
//       // toast({
//       //   title: "Fetching nominee successful",
//       //   status: "success",
//       //   duration: 3000,
//       //   isClosable: true,
//       // });
//     },
//     onError: (error: AxiosError) => {
//       toast({
//         title: "Cannot get nominee",
//         description: error?.message || "An error occurred while fetching the nominee.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     },
//   });

//   return {
//     fetchNominee: mutation.mutateAsync,
//     isError: mutation.isError,
//     error: mutation.error,
//     isLoading: mutation.isLoading, // Corrected from `isPending` to `isLoading`
//   };
// };
