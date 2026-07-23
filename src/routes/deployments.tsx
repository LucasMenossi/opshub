import { createFileRoute } from "@tanstack/react-router";

import { DeploymentsPage } from "@/features/deployments";

export const Route = createFileRoute("/deployments")({
  component: DeploymentsPage,
});
