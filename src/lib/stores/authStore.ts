import { create } from "zustand";

interface AuthStoreState {
  token: string | null;
  user: any;
  setToken: (token: string | null) => void;
  setUser: (user: any) => void;
  logout: () => void;
  isAuth: boolean;
}

export const useAuthStore = create<AuthStoreState>((set, get) => {
  let initialUser = null;
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