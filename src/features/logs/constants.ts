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

export type LogTimeRange = "15m" | "1h" | "24h" | "7d" | "custom" | "";

export const LOG_TIME_RANGES = [
  { value: "", label: "All Time" },
  { value: "15m", label: "Last 15 minutes" },
  { value: "1h", label: "Last hour" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "custom", label: "Custom range" },
] satisfies { value: LogTimeRange; label: string }[];
