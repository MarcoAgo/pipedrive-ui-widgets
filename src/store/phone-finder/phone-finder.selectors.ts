import type {
  TPhoneFinderModel,
  TPhoneFinderStatus,
  TDiscardedEntry,
  TProviderResults,
} from './phone-finder.types';
import { normalizePhone } from '../../helpers/normalize-phone';

export const selectorPhoneFinderStatus = (
  s: TPhoneFinderModel,
): TPhoneFinderStatus => s.status;
export const selectorPhoneFinderCurrentNumber = (
  s: TPhoneFinderModel,
): string | null => s.currentNumber;
export const selectorPhoneFinderCurrentProvider = (
  s: TPhoneFinderModel,
): string | null => s.currentProvider;
export const selectorPhoneFinderConfirmedNumber = (
  s: TPhoneFinderModel,
): string | null => s.confirmedNumber;
export const selectorPhoneFinderConfirmedProvider = (
  s: TPhoneFinderModel,
): string | null => s.confirmedProvider;
export const selectorPhoneFinderDiscardedEntries = (
  s: TPhoneFinderModel,
): TDiscardedEntry[] => s.discardedEntries;
export const selectorPhoneFinderProviderResults = (
  s: TPhoneFinderModel,
): TProviderResults => s.providerResults;
export const selectorPhoneFinderError = (s: TPhoneFinderModel): string | null =>
  s.error;
export const selectorPhoneFinderRemainingAttempts = (
  s: TPhoneFinderModel,
): number => {
  const allNormalized = new Set(
    Object.values(s.providerResults).flat().filter(Boolean).map(normalizePhone),
  );
  const discardedNormalized = new Set(
    s.discardedEntries.map(e => normalizePhone(e.number)),
  );
  return allNormalized.size - discardedNormalized.size;
};

export const selectorPhoneFinderInitialize = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['initialize'] => s.initialize;
export const selectorPhoneFinderConfirmNumber = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['confirmNumber'] => s.confirmNumber;
export const selectorPhoneFinderDiscardNumber = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['discardNumber'] => s.discardNumber;
export const selectorPhoneFinderMarkWrong = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['markWrong'] => s.markWrong;
export const selectorPhoneFinderReset = (
  s: TPhoneFinderModel,
): TPhoneFinderModel['reset'] => s.reset;
