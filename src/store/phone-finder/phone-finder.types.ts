export type TPhoneFinderStatus = 'idle' | 'loading' | 'pending' | 'saved';

export type TProviderResults = Record<string, string[]>;

export interface TDiscardedEntry {
  provider: string;
  number: string;
}

export interface TPhoneFinderInitialData {
  confirmedNumber?: string | null;
  confirmedProvider?: string | null;
  discardedEntries?: TDiscardedEntry[];
}

export interface TPhoneFinderModel {
  status: TPhoneFinderStatus;
  providerResults: TProviderResults;
  currentNumber: string | null;
  currentProvider: string | null;
  confirmedNumber: string | null;
  confirmedProvider: string | null;
  discardedEntries: TDiscardedEntry[];
  error: string | null;

  initialize: (data?: TPhoneFinderInitialData) => void;
  setStatus: (status: TPhoneFinderStatus) => void;
  setProviderResults: (results: TProviderResults) => void;
  setError: (error: string | null) => void;
  confirmNumber: () => void;
  discardNumber: () => void;
  markWrong: () => void;
  reset: () => void;
}
