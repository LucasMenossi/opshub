import { formatEnvironment } from "@/lib/formatters";

import type { LogEntry, LogSeverity } from "../api";

interface LogFilterOptions {
  query: string;
  severity: LogSeverity | "";
  service: string;
  environment: LogEntry["environment"] | "";
}

export function filterLogs(
  logs: LogEntry[],
  { query, severity, service, environment }: LogFilterOptions,
): LogEntry[] {
  const value = query.trim().toLowerCase();

  return logs.filter((log) => {
    const matchesSearch =
      !value ||
      [
        log.message,
        log.service,
        formatEnvironment(log.environment),
        log.severity,
      ].some((field) => field.toLowerCase().includes(value));

    const matchesSeverity = !severity || log.severity === severity;

    const matchesService = !service || log.service === service;

    const matchesEnvironment = !environment || log.environment === environment;

    return (
      matchesSearch && matchesSeverity && matchesService && matchesEnvironment
    );
  });
}
