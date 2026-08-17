import { formatEnvironment } from "@/lib/formatters";

import type { LogEntry, LogSeverity } from "../api";
import type { LogTimeRange } from "../constants";

interface LogFilterOptions {
  query: string;
  severity: LogSeverity | "";
  service: string;
  environment: LogEntry["environment"] | "";
  timeRange: LogTimeRange;
  customStart: string;
  customEnd: string;
}

function getTimeRangeStart(timeRange: LogTimeRange): number | null {
  if (!timeRange || timeRange === "custom") {
    return null;
  }

  const durations: Record<Exclude<LogTimeRange, "" | "custom">, number> = {
    "15m": 15 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
  };

  return Date.now() - durations[timeRange];
}

function getCustomTimeRange(
  customStart: string,
  customEnd: string,
): { start: number; end: number } | null {
  if (!customStart || !customEnd) {
    return null;
  }

  const start = new Date(customStart).getTime();
  const end = new Date(customEnd).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
    return null;
  }

  return { start, end };
}

export function isValidCustomTimeRange(
  customStart: string,
  customEnd: string,
): boolean {
  if (!customStart || !customEnd) {
    return true;
  }

  const start = new Date(customStart).getTime();
  const end = new Date(customEnd).getTime();

  return !Number.isNaN(start) && !Number.isNaN(end) && start <= end;
}

export function filterLogs(
  logs: LogEntry[],
  {
    query,
    severity,
    service,
    environment,
    timeRange,
    customEnd,
    customStart,
  }: LogFilterOptions,
): LogEntry[] {
  const value = query.trim().toLowerCase();
  const timeRangeStart = getTimeRangeStart(timeRange);
  const customTimeRange =
    timeRange === "custom" ? getCustomTimeRange(customStart, customEnd) : null;

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

    const timestamp = new Date(log.timestamp).getTime();

    const matchesTimeRange =
      timeRange === "custom"
        ? customTimeRange !== null &&
          timestamp >= customTimeRange.start &&
          timestamp <= customTimeRange.end
        : timeRangeStart === null || timestamp >= timeRangeStart;

    return (
      matchesSearch &&
      matchesSeverity &&
      matchesService &&
      matchesEnvironment &&
      matchesTimeRange
    );
  });
}
