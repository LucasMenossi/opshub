import type { LogEntry } from "../api";
import type { LogSortOrder } from "../constants";

export function sortLogs(
  logs: LogEntry[],
  sortOrder: LogSortOrder,
): LogEntry[] {
  return [...logs].sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();

    return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
  });
}
