import { createFileRoute } from "@tanstack/react-router";

import { ServiceDetailsPage } from "@/features/services";

export const Route = createFileRoute("/_authenticated/services/$serviceId")({
  component: ServiceDetailsPage,
});
