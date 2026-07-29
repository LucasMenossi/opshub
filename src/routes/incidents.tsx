import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const incidentSearchSchema = z.object({
  q: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  status: z.enum(["open", "investigating", "resolved"]).optional(),
  service: z.string().optional(),
  owner: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const Route = createFileRoute("/incidents")({
  validateSearch: incidentSearchSchema,
  component: Outlet,
});
