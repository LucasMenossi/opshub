import type { LogEntry } from "../api";

export function getSelectedLog(
  logs: LogEntry[],
  selectedLogId: string | null,
): LogEntry | null {
  if (logs.length === 0) {
    return null;
  }

  if (!selectedLogId) {
    return logs[0];
  }

  return logs.find((log) => log.id === selectedLogId) ?? null;
}
