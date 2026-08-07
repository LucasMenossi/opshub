import type { LogSeverity } from "./api";

export const LOG_SEVERITIES: LogSeverity[] = [
  "trace",
  "debug",
  "info",
  "warning",
  "error",
  "fatal",
];

export type LogSortOrder = "desc" | "asc";
