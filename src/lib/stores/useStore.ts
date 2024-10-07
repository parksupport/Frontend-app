// app/stores/useStore.ts

import { create } from 'zustand';

interface StoreState {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));
