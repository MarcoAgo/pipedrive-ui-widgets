import { create } from 'zustand';
import type {
  TPhoneFinderModel,
  TPhoneFinderInitialData,
  TProviderResults,
  TDiscardedEntry,
} from './phone-finder.types';
import { normalizePhone } from '../../helpers/normalize-phone';

const INITIAL_STATE = {
  status: 'idle' as const,
  providerResults: {} as TProviderResults,
  currentNumber: null as string | null,
  currentProvider: null as string | null,
  confirmedNumber: null as string | null,
  confirmedProvider: null as string | null,
  discardedEntries: [] as TDiscardedEntry[],
  error: null as string | null,
};

function findNextNumber(
  providerResults: TProviderResults,
  discardedNumbers: Set<string>,
): { number: string; provider: string } | null {
  for (const [provider, numbers] of Object.entries(providerResults)) {
    for (const number of numbers) {
      if (number && !discardedNumbers.has(normalizePhone(number))) {
        return { number, provider };
      }
    }
  }
  return null;
}

function toDiscardedSet(entries: TDiscardedEntry[]): Set<string> {
  return new Set(entries.map(e => normalizePhone(e.number)));
}

export const phoneFinderStore = create<TPhoneFinderModel>((set, get) => ({
  ...INITIAL_STATE,

  initialize: (data?: TPhoneFinderInitialData) => {
    set({
      ...INITIAL_STATE,
      confirmedNumber: data?.confirmedNumber ?? null,
      confirmedProvider: data?.confirmedProvider ?? null,
      discardedEntries: data?.discardedEntries ?? [],
      status: data?.confirmedNumber ? 'saved' : 'idle',
    });
  },

  setStatus: status => set({ status }),

  setProviderResults: (results: TProviderResults) => {
    const next = findNextNumber(results, new Set());
    if (next) {
      set({
        providerResults: results,
        currentNumber: next.number,
        currentProvider: next.provider,
        discardedEntries: [],
        error: null,
        status: 'pending',
      });
    } else {
      set({
        providerResults: results,
        currentNumber: null,
        currentProvider: null,
        discardedEntries: [],
        error: 'Nessun numero trovato tra i provider disponibili.',
        status: 'idle',
      });
    }
  },

  setError: error => set({ error }),

  confirmNumber: () => {
    const { currentNumber, currentProvider, discardedEntries } = get();
    if (!currentNumber || !currentProvider) return;

    // eslint-disable-next-line no-console
    console.log('[phone-finder] confirmed', {
      winner: { provider: currentProvider, number: currentNumber },
      discarded: discardedEntries,
    });

    set({
      confirmedNumber: currentNumber,
      confirmedProvider: currentProvider,
      currentNumber: null,
      currentProvider: null,
      status: 'saved',
    });
  },

  discardNumber: () => {
    const {
      currentNumber,
      currentProvider,
      providerResults,
      discardedEntries,
    } = get();
    if (!currentNumber || !currentProvider) return;

    const updatedEntries = [
      ...discardedEntries,
      { provider: currentProvider, number: currentNumber },
    ];
    const next = findNextNumber(
      providerResults,
      toDiscardedSet(updatedEntries),
    );

    if (next) {
      set({
        discardedEntries: updatedEntries,
        currentNumber: next.number,
        currentProvider: next.provider,
      });
    } else {
      set({
        discardedEntries: updatedEntries,
        currentNumber: null,
        currentProvider: null,
        error: 'Nessun altro numero disponibile.',
        status: 'idle',
      });
    }
  },

  markWrong: () => {
    const {
      confirmedNumber,
      confirmedProvider,
      providerResults,
      discardedEntries,
    } = get();
    if (!confirmedNumber || !confirmedProvider) return;

    const updatedEntries = [
      ...discardedEntries,
      { provider: confirmedProvider, number: confirmedNumber },
    ];
    const next = findNextNumber(
      providerResults,
      toDiscardedSet(updatedEntries),
    );

    if (next) {
      set({
        confirmedNumber: null,
        confirmedProvider: null,
        discardedEntries: updatedEntries,
        currentNumber: next.number,
        currentProvider: next.provider,
        status: 'pending',
      });
    } else {
      set({
        confirmedNumber: null,
        confirmedProvider: null,
        discardedEntries: updatedEntries,
        currentNumber: null,
        currentProvider: null,
        error: 'Nessun altro numero disponibile.',
        status: 'idle',
      });
    }
  },

  reset: () => set(INITIAL_STATE),
}));
