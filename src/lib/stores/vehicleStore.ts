import {create} from 'zustand'; // Import Zustand
import { devtools } from 'zustand/middleware'; // Import middleware for debugging
import { VehicleInput, VehicleResponse} from '@/types/vehicleInput'; // Import your data types
import addVehicle from '@/api/vehicle'

interface VehicleState {
    formData: VehicleInput;
    setFormData: (formData: Partial<VehicleInput>) => void;
    resetFormData: () => void;
    submitVehicle: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
    vehicles: VehicleResponse[];
  }
  export const useVehicleStore = create<VehicleState>((set, get) => ({
    formData: {
      reg_num: '',
      color: '',
      car_model: '',
      license_num: ''
    },
    setFormData: (newFormData) => set((state) => ({
      formData: { ...state.formData, ...newFormData }
    })),
    resetFormData: () => set({
      formData: {
        reg_num: '',
        color: '',
        car_model: '',
        license_num: ''
      }
    }),
    submitVehicle: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await addVehicle(get().formData);
        set((state) => ({
          vehicles: [...state.vehicles, response],
          isLoading: false,
          error: null,
        }));
        get().resetFormData();
      } catch (error) {
        set({
          isLoading: false,
          error: error.message || 'Failed to add vehicle'
        });
      }
    },
    isLoading: false,
    error: null,
    vehicles: []
  }));
  // // Define the initial form state
  // const initialState: VehicleInput = {
  //   reg_num: '',
  //   color: '',
  //   car_model: '',
  //   license_num: '',
  // };
  // // Create the Zustand store
  // export const useVehicleStore = create(
  //   devtools((set) => ({
  //     formData: initialState, // Initial form data
  //     setFormData: (newData) => set((state) => ({
  //       formData: { ...state.formData, ...newData }, // Update form data
  //     })),
  //     resetFormData: () => set({ formData: initialState }), // Reset form data
  //     submitVehicle: async (data) => {
  //       set({ isLoading: true, error: null }); // Start loading
  //       try {
  //         await addVehicle(data); // Call the API function to submit the form data
  //         set({ isLoading: false }); // Stop loading on success
  //       } catch (error) {
  //         set({ isLoading: false, error: error.message }); // Stop loading and set error on failure
  //       }
  //     },
  //     error: null, // Error state
  //     isLoading: false, // Loading state
  //   }))
  // );