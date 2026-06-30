import { create } from 'zustand';
import type { PipedriveStore } from './pipedrive.types';

export const pipedriveStore = create<PipedriveStore>(set => ({
  sdk: null,
  token: null,
  context: null,
  person: null,

  setSdk: sdk => set({ sdk }),
  setToken: token => set({ token }),
  setContext: context => set({ context }),
  setPerson: person => set({ person }),
}));
