import type { LogEntry } from "../api";

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function paginateLogs(
  logs: LogEntry[],
  page: number,
  pageSize: number,
): LogEntry[] {
  const start = (page - 1) * pageSize;

  return logs.slice(start, start + pageSize);
}
