import { pipedriveStore } from './pipedrive.store';
import type { PipedriveStore } from './pipedrive.types';

export const usePipedrive = <T>(selector: (state: PipedriveStore) => T): T =>
  pipedriveStore(selector);
