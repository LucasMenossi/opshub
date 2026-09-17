import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (email, password) => {
        const isValid = email === "admin@opshub.dev" && password === "opshub";

        if (isValid) {
          set({ isAuthenticated: true });
        }

        return isValid;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "opshub-auth",
    },
  ),
);
