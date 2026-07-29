import { createFileRoute } from "@tanstack/react-router";

import { IncidentDetailsPage } from "@/features/incidents";

export const Route = createFileRoute("/incidents/$incidentId")({
  component: IncidentDetailsPage,
});
