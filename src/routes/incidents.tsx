import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { IncidentsPage } from "@/features/incidents";

const incidentSearchSchema = z.object({
  q: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  status: z
    .enum(["open", "investigating", "monitoring", "resolved"])
    .optional(),
  service: z.string().optional(),
  owner: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const Route = createFileRoute("/incidents")({
  validateSearch: incidentSearchSchema,
  component: IncidentsPage,
});
