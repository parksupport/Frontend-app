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
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export const useAuthStore =  create<AuthStoreState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));

