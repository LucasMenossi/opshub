import { http, HttpResponse } from "msw";

import { logs } from "@/features/logs/data/logs";
import type { LogSeverity } from "@/features/logs/api";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

function parseDate(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const timestamp = new Date(value).getTime();

  return Number.isNaN(timestamp) ? null : timestamp;
}

function parseLimit(value: string | null): number {
  const limit = Number(value);

  if (!Number.isInteger(limit) || limit <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(limit, MAX_LIMIT);
}

function parseCursor(value: string | null): number {
  const cursor = Number(value);

  if (!Number.isInteger(cursor) || cursor < 0) {
    return 0;
  }

  return cursor;
}

export const logsHandlers = [
  http.get("/api/logs", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.trim().toLowerCase() ?? "";

    const service = url.searchParams.get("service") ?? "";
    const environment = url.searchParams.get("environment") ?? "";

    const severity =
      (url.searchParams.get("severity") as LogSeverity | null) ?? null;

    const start = parseDate(url.searchParams.get("start"));
    const end = parseDate(url.searchParams.get("end"));

    const sortOrder =
      url.searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const limit = parseLimit(url.searchParams.get("limit"));
    const cursor = parseCursor(url.searchParams.get("cursor"));

    const filteredLogs = logs
      .filter((log) => {
        const matchesSearch =
          !search ||
          [log.message, log.service, log.severity].some((field) =>
            field.toLowerCase().includes(search),
          );

        const matchesService = !service || log.service === service;

        const matchesEnvironment =
          !environment || log.environment === environment;

        const matchesSeverity = !severity || log.severity === severity;

        const timestamp = new Date(log.timestamp).getTime();

        const matchesStart = start === null || timestamp >= start;

        const matchesEnd = end === null || timestamp <= end;

        return (
          matchesSearch &&
          matchesService &&
          matchesEnvironment &&
          matchesSeverity &&
          matchesStart &&
          matchesEnd
        );
      })
      .sort((a, b) => {
        const difference =
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();

        return sortOrder === "asc" ? difference : -difference;
      });

    const items = filteredLogs.slice(cursor, cursor + limit);

    const nextOffset = cursor + items.length;

    const nextCursor =
      nextOffset < filteredLogs.length ? String(nextOffset) : undefined;

    return HttpResponse.json({
      items,
      nextCursor,
    });
  }),
];
