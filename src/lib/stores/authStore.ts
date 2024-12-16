// app/stores/useStore.ts

import { create } from 'zustand';

interface AuthStoreState {
  token: string | null;
  user: any; // Use appropriate type instead of 'any' based on your user object
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; // Use appropriate type instead of 'any' based on your user object
  logout: () => void;
  email: string;
  setEmail: (email: string) => void;
}



// export const useAuthStore =  create<AuthStoreState>((set) => ({
//   email: '',
//   setEmail: (email) => set({ email }),
//   token: null,
//   user: null,
//   setToken: (token) => set({ token }),
//   setUser: (user) => set({ user }),
//   logout: () => set({ token: null, user: null }),
// }));



// export const useAuthStore = create<AuthStoreState>((set, get) => {
//   // Get the initial state from localStorage (if it exists)
//   const storedUser = localStorage.getItem("userProfileData");
//   const initialUser = storedUser ? JSON.parse(storedUser) : null;
//   const storedToken = localStorage.getItem("authToken"); // Retrieve token from localStorage if present

//   return {
//     email: "",
//     setEmail: (email) => set({ email }),

//     token: storedToken || null, // Initialize token from localStorage
//     user: initialUser,

//     setToken: (token) => {
//       // Save token in both the state and localStorage
//       if (token) {
//         localStorage.setItem("authToken", token);
//       } else {
//         localStorage.removeItem("authToken");
//       }
//       set({ token });
//     },

//     getToken: () => {
//       // Get token from the state or localStorage
//       const stateToken = get().token;
//       if (stateToken) return stateToken;

//       const localStorageToken = localStorage.getItem("authToken");
//       if (localStorageToken) {
//         set({ token: localStorageToken }); // Sync token with the state
//         return localStorageToken;
//       }

//       return null; // No token found
//     },

//     setUser: (user) => {
//       // Update both the state and localStorage
//       if (user) {
//         localStorage.setItem("userProfileData", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("userProfileData");
//       }
//       set({ user });
//     },

//     logout: () => {
//       // Clear user and token from state and localStorage
//       localStorage.removeItem("userProfileData");
//       localStorage.removeItem("authToken");
//       set({ token: null, user: null });
//     },
//   };
// });

export const useAuthStore = create<AuthStoreState>((set, get) => {
  let initialUser = null;
  let storedToken = null;


  if (typeof window !== "undefined") {
    // Access localStorage only in the browser
    try {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        initialUser = JSON.parse(storedUser); // Safely parse
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }

    storedToken = localStorage.getItem("authToken");
  }


  return {
    email: "",
    setEmail: (email) => set({ email }),

    token: storedToken || null, // Initialize token from localStorage
    user: initialUser,
    

    setToken: (token) => {
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("authToken", token);
        } else {
          localStorage.removeItem("authToken");
        }
      }
      set({ token });
    },

    getToken: () => {
      if (typeof window !== "undefined") {
        const stateToken = get().token;
        if (stateToken) return stateToken;

        const localStorageToken = localStorage.getItem("authToken");
        if (localStorageToken) {
          set({ token: localStorageToken }); // Sync token with the state
          return localStorageToken;
        }
      }

      return null; // No token found
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
      }
      set({ token: null, user: null });
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