import type { PipedriveContext } from '../store/pipedrive/pipedrive.types';
import { callPipedriveProxy } from './call-pipedrive-proxy';

export async function fetchContextEntity(
  context: PipedriveContext,
): Promise<unknown> {
  const { resource, entityId, companyId } = context;

  if (!resource || !entityId || !companyId) {
    throw new Error('resource, entityId e companyId sono obbligatori');
  }

  return callPipedriveProxy({ companyId, resource, entityId });
}
