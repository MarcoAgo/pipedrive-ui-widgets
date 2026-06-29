export interface TPipedrivePersonRaw extends Record<string, unknown> {
  first_name: string | null;
  last_name: string | null;
  org_name: string | null;
}

export interface TParsedPerson {
  firstName: string | null;
  lastName: string | null;
  linkedInUrl: string | null;
  companyName: string | null;
}

export function parsePipedrivePerson(raw: TPipedrivePersonRaw): TParsedPerson {
  const linkedInUrl =
    (Object.values(raw).find(
      v => typeof v === 'string' && v.includes('linkedin.com'),
    ) as string | undefined) ?? null;

  return {
    firstName: raw.first_name,
    lastName: raw.last_name,
    linkedInUrl,
    companyName: raw.org_name,
  };
}
