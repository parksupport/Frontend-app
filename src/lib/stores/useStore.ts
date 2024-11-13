// app/stores/useStore.ts

import { create } from 'zustand';


interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: any
  // other state properties if any
}

interface StoreState {
  isOpen: boolean;
  drawerContent: JSX.Element | null;
  // setDrawerContent: (content: JSX.Element | null) => void;
  // toggleDrawer: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));


const useStore = create<StoreState>((set) => ({
  isOpen: false,
  drawerContent: null,
  // toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useStore;

interface DrawerState {
  isOpen: boolean;
  drawerContent: React.ReactNode | null;
  setIsOpen: (isOpen: boolean) => void;
  setDrawerContent: (content: React.ReactNode) => void;
}
 export  const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  drawerContent: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setDrawerContent: (content) => set({ drawerContent: content }),
}));