import { create } from 'zustand';
import type {
  TPhoneFinderModel,
  TPhoneFinderInitialData,
} from './phone-finder.types';

const MAX_ATTEMPTS = 3;

const INITIAL_STATE = {
  status: 'idle' as const,
  currentNumber: null,
  confirmedNumber: null,
  discardedNumbers: [] as string[],
  remainingAttempts: MAX_ATTEMPTS,
};

export const phoneFinderStore = create<TPhoneFinderModel>((set, get) => ({
  ...INITIAL_STATE,

  initialize: (data?: TPhoneFinderInitialData) => {
    set({
      ...INITIAL_STATE,
      confirmedNumber: data?.confirmedNumber ?? null,
      discardedNumbers: data?.discardedNumbers ?? [],
      remainingAttempts: data?.remainingAttempts ?? MAX_ATTEMPTS,
      status: data?.confirmedNumber ? 'saved' : 'idle',
    });
  },

  setStatus: status => set({ status }),

  setCurrentNumber: currentNumber => set({ currentNumber }),

  confirmNumber: () => {
    const { currentNumber } = get();
    if (!currentNumber) return;
    set({
      confirmedNumber: currentNumber,
      currentNumber: null,
      status: 'saved',
    });
  },

  discardNumber: () => {
    const { currentNumber, discardedNumbers, remainingAttempts } = get();
    if (!currentNumber) return;
    set({
      discardedNumbers: [...discardedNumbers, currentNumber],
      currentNumber: null,
      remainingAttempts: Math.max(0, remainingAttempts - 1),
      status: 'idle',
    });
  },

  undoDiscard: number => {
    const { discardedNumbers } = get();
    set({ discardedNumbers: discardedNumbers.filter(n => n !== number) });
  },

  markWrong: () => {
    const { confirmedNumber, discardedNumbers } = get();
    if (!confirmedNumber) return;
    set({
      discardedNumbers: [...discardedNumbers, confirmedNumber],
      confirmedNumber: null,
      status: 'idle',
    });
  },

  reset: () => set(INITIAL_STATE),
}));
