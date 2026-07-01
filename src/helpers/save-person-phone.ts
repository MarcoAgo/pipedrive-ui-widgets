import { callPipedriveProxy } from './call-pipedrive-proxy';

export async function savePersonPhone(
  entityId: string,
  companyId: string,
  phone: string,
): Promise<void> {
  await callPipedriveProxy({
    companyId,
    resource: 'person',
    entityId,
    method: 'PATCH',
    payload: {
      phone: [{ value: phone, label: 'work', primary: true }],
    },
  });
}
