import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ServicesPage } from "@/features/services";
import { optionalSearchEnum } from "@/utils/searchSchema";

const serviceSearchSchema = z.object({
  q: z.string().optional(),
  status: optionalSearchEnum(["healthy", "degraded", "down"]),
  environment: optionalSearchEnum(["production", "staging"]),
  sortBy: z.string().optional(),
  sortOrder: optionalSearchEnum(["asc", "desc"]),
});

export const Route = createFileRoute("/_authenticated/services/")({
  validateSearch: serviceSearchSchema,
  component: ServicesPage,
});
