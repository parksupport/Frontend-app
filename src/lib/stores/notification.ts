// store.ts

import {create} from 'zustand';

interface StoreState {
    isProfileActive: boolean;
    isNotificationsActive: boolean;
    isPopupVisible: boolean;
    isDropdownVisible: boolean; // New state to control visibility
    toggleProfile: () => void;
    toggleNotifications: () => void;
    showPopup: () => void;
    closePopup: () => void;
    toggleDropdown: () => void; // New function to toggle dropdown visibility
  }
  
const useStore = create<StoreState>((set) => ({
    isProfileActive: false,
    isNotificationsActive: false,
    isPopupVisible: false,
    isDropdownVisible: false, // Initialize as false
    toggleProfile: () =>
      set((state) => ({
        isProfileActive: !state.isProfileActive,
        isNotificationsActive: false,
      })),
    toggleNotifications: () =>
      set((state) => ({
        isNotificationsActive: !state.isNotificationsActive,
        isProfileActive: false,
      })),
    showPopup: () => set({ isPopupVisible: true }),
    closePopup: () => set({ isPopupVisible: false }),
    toggleDropdown: () =>
      set((state) => ({ isDropdownVisible: !state.isDropdownVisible })), // Toggle function
  }));
  
  export default useStore;
