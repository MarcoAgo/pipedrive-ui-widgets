import type AppExtensionsSDK from "@pipedrive/app-extensions-sdk";
import { create } from "zustand";

export interface PipedriveStore {
  token: string | null;
  sdk: AppExtensionsSDK | null;

  setSdk: (sdk: AppExtensionsSDK) => void;
  setToken: (token: string) => void;
}

export const usePipedrive = create<PipedriveStore>((set) => ({
  token: null,
  sdk: null,

  setSdk: (sdk: AppExtensionsSDK) => set({ sdk }),
  setToken: (token: string) => set({ token }),
}));
