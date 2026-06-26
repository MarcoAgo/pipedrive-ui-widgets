import { phoneFinderStore } from './phone-finder.store';
import type { TPhoneFinderModel } from './phone-finder.types';

export const usePhoneFinder = <T>(
  selector: (state: TPhoneFinderModel) => T,
): T => phoneFinderStore(selector);
