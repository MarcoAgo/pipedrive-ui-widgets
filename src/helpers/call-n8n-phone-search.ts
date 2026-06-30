import type { TParsedPerson } from './parse-pipedrive-person';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const N8N_WEBHOOK_USER = import.meta.env.VITE_N8N_WEBHOOK_USER;
const N8N_WEBHOOK_PASSWORD = import.meta.env.VITE_N8N_WEBHOOK_PASSWORD;

export interface TN8nPhoneSearchResponse {
  phone: string;
}

export async function callN8nPhoneSearch(
  person: TParsedPerson,
): Promise<TN8nPhoneSearchResponse> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${N8N_WEBHOOK_USER}:${N8N_WEBHOOK_PASSWORD}`)}`,
    },
    body: JSON.stringify({
      firstName: person.firstName,
      lastName: person.lastName,
      linkedInUrl: person.linkedInUrl,
      companyName: person.companyName,
    }),
  });

  if (!response.ok) {
    throw new Error(`n8n webhook error ${response.status}`);
  }

  return response.json();
}
