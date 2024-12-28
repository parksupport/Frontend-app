import { getNominee } from "@/api/nominee";
import { useQuery } from "@tanstack/react-query";



export const useGetNominees = (registration_number: string) => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["nominee", registration_number],
      queryFn: () => getNominee(registration_number),
      enabled: Boolean(registration_number),
    });
  
    return { nominees: data, error, isLoading };
  };