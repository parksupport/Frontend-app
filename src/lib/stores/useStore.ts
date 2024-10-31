// app/stores/useStore.ts

import { create } from 'zustand';

interface StoreState {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
}
interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: any
  // other state properties if any
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export const useAuthStore = create<AuthState>((set) => ({  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));