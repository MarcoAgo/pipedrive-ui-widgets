import type AppExtensionsSDK from "@pipedrive/app-extensions-sdk";
import { create } from "zustand";

export interface PipedriveContext {
  selectedIds: string | null;
  resource: string | null;
  entityId: string | null;
  userId: string | null;
  companyId: string | null;
}

export interface PipedriveStore {
  token: string | null;
  sdk: AppExtensionsSDK | null;
  context: PipedriveContext | null;

  setSdk: (sdk: AppExtensionsSDK) => void;
  setToken: (token: string) => void;
  setContext: (context: PipedriveContext) => void;
}

export const usePipedrive = create<PipedriveStore>((set) => ({
  token: null,
  sdk: null,
  context: null,

  setSdk: (sdk: AppExtensionsSDK) => set({ sdk }),
  setToken: (token: string) => set({ token }),
  setContext: (context: PipedriveContext) => set({ context }),
}));
