import vehicle from "@/api/vehicle";
import { create } from "zustand";




// const DemoUser = {
//   "id": 5,
//   "uid": "8650052488",
//   "full_name": "John Mike",
//   "email_address": "tmoscotayo@gmail.com",
//   "user_type": "corportate",
//   "address": "20 Harrison Ojemen Street Abesan Estate Ipaja",
//   "date_of_birth": "2024-12-02",
//   "phone_number": "09060998169",
//   "car_verification_number": "DQ851ABJ",
//   "post_code": "100281",
//   "company_name": null,
//   "company_registration_number": null,
//   "company_email": null,
//   "company_phone_number": null,
//   "position": null,
//   "city": null,
//   "state": null,
//   "country": null
// }



interface AuthStoreState {
  token: string | null;
  user: any | null;
  isAuth: boolean;
  nominee: any | null;
  vehicle: any | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  setNominee: (nominee: any | null) => void;
  setVehicle: (vehicle: any | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => {
  const initializeStore = () => {
    let token: string | null = null;
    let user: any | null = null;
    let nominee: any | null = null;

    if (typeof window !== "undefined") {
      try {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("userData");
        const storedNominee = localStorage.getItem("nomineeData");
        const storedVehicle = localStorage.getItem("vehicleData");

        if (storedToken) token = storedToken;
        if (storedUser) user = JSON.parse(storedUser);
        if (storedNominee) nominee = JSON.parse(storedNominee);
        if (storedVehicle) user = JSON.parse(storedVehicle);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }

    return { token, user, nominee, vehicle,isAuth: !!token };
  };

  const { token, user, nominee, isAuth } = initializeStore();

  return {
    token,
    user,
    isAuth,
    nominee,
    vehicle,

    setToken: (token) => {
      if (typeof window !== "undefined") {
        try {
          if (token) {
            localStorage.setItem("authToken", token);
          } else {
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Error saving token to localStorage:", error);
        }
      }
      set({ token, isAuth: !!token });
    },

    setUser: (user) => {
      if (typeof window !== "undefined") {
        try {
          if (user) {
            localStorage.setItem("userData", JSON.stringify(user));
          } else {
            localStorage.removeItem("userData");
          }
        } catch (error) {
          console.error("Error saving user data to localStorage:", error);
        }
      }
      set({ user });
    },

    setNominee: (nominee) => {
      if (typeof window !== "undefined") {
        try {
          if (nominee) {
            localStorage.setItem("nomineeData", JSON.stringify(nominee));
          } else {
            localStorage.removeItem("nomineeData");
          }
        } catch (error) {
          console.error("Error saving nominee data to localStorage:", error);
        }
      }
      set({ nominee });
    },
    setVehicle: (vehicle) => {
      if (typeof window !== "undefined") {
        try {
          if (vehicle) {
            localStorage.setItem("vehicleData", JSON.stringify(vehicle));
          } else {
            localStorage.removeItem("vehicleData");
          }
        } catch (error) {
          console.error("Error saving vehicle data to localStorage:", error);
        }
      }
      set({ vehicle });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("userData");
          localStorage.removeItem("authToken");
          localStorage.removeItem("nomineeData");
          localStorage.removeItem("vehicleData");
        } catch (error) {
          console.error("Error clearing localStorage on logout:", error);
        }
      }
      set({ token: null, user: null, nominee: null,vehicle: null, isAuth: false });
    },
  };
});

// useSignupStore.ts

interface SignupState {
  formData: any;
  updateFormData: (newData: any) => void;
  resetFormData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  formData: {},
  updateFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),
  resetFormData: () => set({ formData: {} }),
}));