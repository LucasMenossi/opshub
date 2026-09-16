import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ServicesPage } from "@/features/services";

const serviceSearchSchema = z.object({
  q: z.string().optional(),
  status: z.enum(["healthy", "degraded", "down"]).optional(),
  environment: z.enum(["production", "staging"]).optional(),
});

export const Route = createFileRoute("/services/")({
  validateSearch: serviceSearchSchema,
  component: ServicesPage,
});
