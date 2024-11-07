// // hooks/useDeleteCar.js
// import { useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
// /**
//  * Custom hook to handle car deletion.
//  * Uses react-query's useMutation to manage the mutation state and perform the delete operation.
//  * 
//  * @returns {function} mutate - Function to trigger the delete mutation.
//  * @returns {object} mutation - Object containing the mutation state and handlers.
//  */
// const useDeleteCar = () => {
//   const queryClient = useQueryClient();
//   // Define the mutation function that will make the delete request
//   const deleteCar = async (carId) => {
//     const response = await axios.delete(`/api/cars/${carId}`);
//     return response.data;
//   };
//   // Use the useMutation hook to manage the mutation state
//   const mutation = useMutation(deleteCar, {
//     onSuccess: () => {
//       // Invalidate and refetch the 'cars' query to update the local cache
//       queryClient.invalidateQueries('cars');
//     },
//   });
//   return mutation;
// };
// export default useDeleteCar;