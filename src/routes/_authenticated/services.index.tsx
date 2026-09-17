import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ServicesPage } from "@/features/services";

const serviceSearchSchema = z.object({
  q: z.string().optional(),
  status: z.enum(["healthy", "degraded", "down"]).optional(),
  environment: z.enum(["production", "staging"]).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const Route = createFileRoute("/_authenticated/services/")({
  validateSearch: serviceSearchSchema,
  component: ServicesPage,
});
