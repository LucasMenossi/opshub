import { createFileRoute } from "@tanstack/react-router";

import { IncidentsPage } from "@/features/incidents";

export const Route = createFileRoute("/_authenticated/incidents/")({
  component: IncidentsPage,
});
