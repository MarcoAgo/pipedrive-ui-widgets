import type { PipedriveContext } from "../store/use-pipedrive";

const PIPEDRIVE_API_URL = "https://api.pipedrive.com/v1";

// Map resource types to correct Pipedrive API endpoint names
const RESOURCE_MAP: Record<string, string> = {
  deal: "deals",
  person: "persons",
  organization: "organizations",
};

export async function fetchContextEntity(
  context: PipedriveContext,
  token: string
) {
  const { resource, entityId } = context;

  if (!resource || !entityId) {
    throw new Error("Resource and entityId are required");
  }

  // Map resource to correct API endpoint name
  const apiResource = RESOURCE_MAP[resource.toLowerCase()];
  if (!apiResource) {
    throw new Error(
      `Invalid resource type: ${resource}. Supported types: deal, person, organization`
    );
  }

  try {
    const response = await fetch(
      `${PIPEDRIVE_API_URL}/${apiResource}/${entityId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Pipedrive API error: ${response.status} ${response.statusText}. ${
          errorData.error || ""
        }`
      );
    }

    const data = await response.json();

    // Pipedrive API returns data in a 'data' property
    return data.data || data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch context entity: ${String(error)}`);
  }
}
