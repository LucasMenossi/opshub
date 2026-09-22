import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LogsPage } from "@/features/logs";
import { optionalSearchEnum } from "@/utils/searchSchema";

const logSearchSchema = z.object({
  search: z.string().optional(),
  severity: optionalSearchEnum([
    "trace",
    "debug",
    "info",
    "warning",
    "error",
    "fatal",
  ]),
  service: z.string().optional(),
  environment: optionalSearchEnum(["production", "staging"]),
  timeRange: optionalSearchEnum(["15m", "1h", "24h", "7d", "custom"]),
  customStart: z.string().optional(),
  customEnd: z.string().optional(),
  sortOrder: optionalSearchEnum(["asc", "desc"]),
});

export const Route = createFileRoute("/_authenticated/logs/")({
  validateSearch: logSearchSchema,
  component: LogsPage,
});
