import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteCar = (car: any) => {
  return axios.delete('http://localhost:8000', { data: car });
};

export const useDeleteCar = () => {
  return useMutation(deleteCar);
};
