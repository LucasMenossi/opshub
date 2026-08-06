import type { Environment } from "@/features/services";

export type LogSeverity =
  "trace" | "debug" | "info" | "warning" | "error" | "fatal";

export interface LogEntry {
  id: string;
  timestamp: string;

  serviceId: string;
  service: string;

  environment: Environment;

  severity: LogSeverity;

  message: string;
}

export interface LogsResponse {
  items: LogEntry[];
  nextCursor?: string;
}
