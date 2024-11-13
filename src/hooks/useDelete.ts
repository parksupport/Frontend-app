import { create } from 'zustand';
// drawerStore.ts
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
