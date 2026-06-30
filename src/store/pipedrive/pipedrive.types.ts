import type AppExtensionsSDK from '@pipedrive/app-extensions-sdk';
import type { TParsedPerson } from '../../helpers/parse-pipedrive-person';

export interface PipedriveContext {
  selectedIds: string | null;
  resource: string | null;
  entityId: string | null;
  userId: string | null;
  companyId: string | null;
  token: string | null;
}

export interface PipedriveStore {
  sdk: AppExtensionsSDK | null;
  token: string | null;
  context: PipedriveContext | null;
  person: TParsedPerson | null;

  setSdk: (sdk: AppExtensionsSDK) => void;
  setToken: (token: string) => void;
  setContext: (context: PipedriveContext) => void;
  setPerson: (person: TParsedPerson) => void;
}
