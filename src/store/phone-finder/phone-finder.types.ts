export type TPhoneFinderStatus = 'idle' | 'loading' | 'pending' | 'saved';

export interface TPhoneFinderInitialData {
  confirmedNumber?: string | null;
  discardedNumbers?: string[];
  remainingAttempts?: number;
}

export interface TPhoneFinderModel {
  status: TPhoneFinderStatus;
  currentNumber: string | null;
  confirmedNumber: string | null;
  discardedNumbers: string[];
  remainingAttempts: number;

  initialize: (data?: TPhoneFinderInitialData) => void;
  setStatus: (status: TPhoneFinderStatus) => void;
  setCurrentNumber: (number: string | null) => void;
  confirmNumber: () => void;
  discardNumber: () => void;
  undoDiscard: (number: string) => void;
  markWrong: () => void;
  reset: () => void;
}
