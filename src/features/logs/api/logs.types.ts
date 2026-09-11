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

export interface LogsQueryParams {
  search?: string;
  service?: string;
  environment?: Environment;
  severity?: LogSeverity;
  start?: string;
  end?: string;
  cursor?: string;
  limit?: number;
  sortOrder?: "asc" | "desc";
}

export interface LogsResponse {
  items: LogEntry[];
  nextCursor?: string;
}
