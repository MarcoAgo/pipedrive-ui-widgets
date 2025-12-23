import { create } from "zustand";

export interface ReverseStore {
  token: string | null;
  refreshToken: string | null;

  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useReverse = create<ReverseStore>((set) => ({
  token: null,
  refreshToken: null,

  setToken: (token: string) => set({ token }),
  setRefreshToken: (refreshToken: string) => set({ refreshToken }),
}));
