import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserSignResponse } from "@/types";

export interface AuthState {
  userSession: UserSignResponse | null;
  getUserToken: () => string;
  setUserSession: (user: UserSignResponse) => void;
  removeUserSession: () => void;
  isAuthenticated: () => boolean;
}

// With persist it will store the auth state in the local storage
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userSession: null,
      getUserToken: () => {
        return get().userSession?.token || "";
      },
      setUserSession: (user: UserSignResponse) => {
        set({ userSession: user });
      },
      removeUserSession: () => {
        set({ userSession: null });
        localStorage.removeItem("auth");
      },
      isAuthenticated: () => {
        return !!get().userSession;
      },
    }),
    { name: "auth" },
  ),
);
