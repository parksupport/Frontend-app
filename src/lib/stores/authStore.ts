// app/stores/useStore.ts

import { create } from 'zustand';

interface StoreState {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
  
}
interface AuthStoreState {
  token: string | null;
  user: any; // Use appropriate type instead of 'any' based on your user object
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; // Use appropriate type instead of 'any' based on your user object
  logout: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export const useAuthStore =  create<AuthStoreState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));

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

