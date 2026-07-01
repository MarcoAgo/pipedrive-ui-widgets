const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export interface TCallPipedriveProxyOptions {
  companyId: string;
  resource: string;
  entityId: string;
  method?: 'GET' | 'PATCH' | 'POST';
  payload?: Record<string, unknown>;
}

export async function callPipedriveProxy(
  options: TCallPipedriveProxyOptions,
): Promise<unknown> {
  const { companyId, resource, entityId, method = 'GET', payload } = options;

  const response = await fetch(
    `${PROXY_URL}/.netlify/functions/pipedrive-proxy`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId, resource, entityId, method, payload }),
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
