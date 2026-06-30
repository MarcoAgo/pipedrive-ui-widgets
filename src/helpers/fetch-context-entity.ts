import type { PipedriveContext } from '../store/pipedrive/pipedrive.types';

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchContextEntity(
  context: PipedriveContext,
): Promise<unknown> {
  const { resource, entityId, companyId } = context;

  if (!resource || !entityId || !companyId) {
    throw new Error('resource, entityId e companyId sono obbligatori');
  }

  const response = await fetch(
    `${PROXY_URL}/.netlify/functions/pipedrive-proxy`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId, resource, entityId }),
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Proxy error ${response.status}: ${(err as { error?: string }).error ?? response.statusText}`,
    );
  }

  return response.json();
}
