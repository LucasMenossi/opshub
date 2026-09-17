import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const logSearchSchema = z.object({
  search: z.string().optional(),
  severity: z
    .enum(["trace", "debug", "info", "warning", "error", "fatal"])
    .optional(),
  service: z.string().optional(),
  environment: z.enum(["production", "staging"]).optional(),
  timeRange: z.enum(["15m", "1h", "24h", "7d", "custom"]).optional(),
  customStart: z.string().optional(),
  customEnd: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const Route = createFileRoute("/_authenticated/logs")({
  validateSearch: logSearchSchema,
  component: Outlet,
});
