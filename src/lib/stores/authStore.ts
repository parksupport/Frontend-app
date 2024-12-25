// src/lib/stores/authStore.ts
import vehicle from "@/api/vehicle";
import { create } from "zustand";

type AuthStoreState = {
  token: string | null;
  user: any | null;
  isAuth: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => {
  const initializeStore = () => {
    let token: string | null = null;
    let user: any | null = null;

    if (typeof window !== "undefined") {
      try {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("userData");
        if (storedToken) token = storedToken;
        if (storedUser) user = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }

    return { token, user, isAuth: !!token };
  };

  const { token, user, isAuth } = initializeStore();

  return {
    token,
    user,
    isAuth,
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

    logout: () => {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("userData");
          localStorage.removeItem("authToken");
        } catch (error) {
          console.error("Error clearing localStorage on logout:", error);
        }
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