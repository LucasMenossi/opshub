import { createFileRoute } from "@tanstack/react-router";

import { IncidentDetailsPage } from "@/features/incidents";

export const Route = createFileRoute("/_authenticated/incidents/$incidentId")({
  component: IncidentDetailsPage,
});
