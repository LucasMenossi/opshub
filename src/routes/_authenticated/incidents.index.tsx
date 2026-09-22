import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { IncidentsPage } from "@/features/incidents";
import { optionalSearchEnum } from "@/utils/searchSchema";

const incidentSearchSchema = z.object({
  q: z.string().optional(),
  severity: optionalSearchEnum(["low", "medium", "high", "critical"]),
  status: optionalSearchEnum(["open", "investigating", "resolved"]),
  service: z.string().optional(),
  owner: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: optionalSearchEnum(["asc", "desc"]),
});

export const Route = createFileRoute("/_authenticated/incidents/")({
  validateSearch: incidentSearchSchema,
  component: IncidentsPage,
});
