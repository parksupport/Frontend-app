import { create } from "zustand";

interface AuthStoreState {
  token: string | null;
  user: any;
  setToken: (token: string | null) => void;
  setUser: (user: any) => void;
  logout: () => void;
  isAuth: boolean;
}


const DemoUser = {
  "id": 5,
  "uid": "8650052488",
  "full_name": "John Mike",
  "email_address": "tmoscotayo@gmail.com",
  "user_type": "corportate",
  "address": "20 Harrison Ojemen Street Abesan Estate Ipaja",
  "date_of_birth": "2024-12-02",
  "phone_number": "09060998169",
  "car_verification_number": "DQ851ABJ",
  "post_code": "100281",
  "company_name": null,
  "company_registration_number": null,
  "company_email": null,
  "company_phone_number": null,
  "position": null,
  "city": null,
  "state": null,
  "country": null
}

export const useAuthStore = create<AuthStoreState>((set, get) => {
  let initialUser = DemoUser;
  let storedToken = null;

  if (typeof window !== "undefined") {
    try {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        initialUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }

    storedToken = localStorage.getItem("authToken");
  }

  return {
    token: storedToken || null,
    user: initialUser,
    isAuth: !!storedToken,

    setToken: (token) => {
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("authToken", token);
        } else {
          localStorage.removeItem("authToken");
        }
      }
      set({ token, isAuth: !!token });
    },

    setUser: (user) => {
      if (typeof window !== "undefined") {
        if (user) {
          localStorage.setItem("userData", JSON.stringify(user));
        } else {
          localStorage.removeItem("userData");
        }
      }
      set({ user });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      }
      set({ token: null, user: null, isAuth: false });
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