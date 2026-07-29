import { createFileRoute } from "@tanstack/react-router";

import { IncidentsPage } from "@/features/incidents";

export const Route = createFileRoute("/incidents")({
  component: IncidentsPage,
});
