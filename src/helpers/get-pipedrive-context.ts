export function getPipedriveContext() {
  const contextParams = new URLSearchParams(window.location.search);

  return {
    selectedIds: contextParams.get("selectedIds"),
    resource: contextParams.get("resource"), // deal | person | organization
    entityId: contextParams.get("selectedIds"), // ID entità
    userId: contextParams.get("userId"),
    companyId: contextParams.get("companyId"),
  };
}
