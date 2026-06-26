import type { PipedriveContext } from '../store/use-pipedrive';

export function getPipedriveContext(): PipedriveContext {
  const contextParams = new URLSearchParams(window.location.search);

  return {
    selectedIds: contextParams.get('selectedIds'),
    resource: contextParams.get('resource'),
    entityId: contextParams.get('selectedIds'),
    userId: contextParams.get('userId'),
    companyId: contextParams.get('companyId'),
    token: contextParams.get('token'),
  };
}
