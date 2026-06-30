import type {
  TPhoneFinderModel,
  TPhoneFinderStatus,
} from './phone-finder.types';

export const selectorPhoneFinderStatus = (
  s: TPhoneFinderModel,
): TPhoneFinderStatus => s.status;
export const selectorPhoneFinderCurrentNumber = (
  s: TPhoneFinderModel,
): string | null => s.currentNumber;
export const selectorPhoneFinderConfirmedNumber = (
  s: TPhoneFinderModel,
): string | null => s.confirmedNumber;
export const selectorPhoneFinderDiscardedNumbers = (
  s: TPhoneFinderModel,
): string[] => s.discardedNumbers;
export const selectorPhoneFinderRemainingAttempts = (
  s: TPhoneFinderModel,
): number => s.remainingAttempts;
export const selectorPhoneFinderError = (s: TPhoneFinderModel): string | null =>
  s.error;

export const selectorPhoneFinderInitialize = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['initialize'] => s.initialize;
export const selectorPhoneFinderSetStatus = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['setStatus'] => s.setStatus;
export const selectorPhoneFinderSetCurrentNumber = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['setCurrentNumber'] => s.setCurrentNumber;
export const selectorPhoneFinderConfirmNumber = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['confirmNumber'] => s.confirmNumber;
export const selectorPhoneFinderDiscardNumber = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['discardNumber'] => s.discardNumber;
export const selectorPhoneFinderUndoDiscard = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['undoDiscard'] => s.undoDiscard;
export const selectorPhoneFinderMarkWrong = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['markWrong'] => s.markWrong;
export const selectorPhoneFinderReset = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['reset'] => s.reset;
