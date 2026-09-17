import { http, HttpResponse } from "msw";

import { logs } from "@/features/logs/data/logs";

import type { LogSeverity } from "@/features/logs/api";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

type LogCursor = {
  timestamp: string;
  id: string;
};

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

function encodeCursor(cursor: LogCursor): string {
  return btoa(JSON.stringify(cursor));
}

function parseCursor(value: string | null): LogCursor | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(atob(value)) as Partial<LogCursor>;

    if (typeof parsed.timestamp !== "string" || typeof parsed.id !== "string") {
      return null;
    }

    if (Number.isNaN(new Date(parsed.timestamp).getTime())) {
      return null;
    }

    return {
      timestamp: parsed.timestamp,
      id: parsed.id,
    };
  } catch {
    return null;
  }
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
        const timestampDifference =
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();

        if (timestampDifference !== 0) {
          return sortOrder === "asc"
            ? timestampDifference
            : -timestampDifference;
        }

        return sortOrder === "asc"
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id);
      });

    const cursorTimestamp = cursor
      ? new Date(cursor.timestamp).getTime()
      : null;

    const cursorLogs = filteredLogs.filter((log) => {
      if (!cursor || cursorTimestamp === null) {
        return true;
      }

      const timestamp = new Date(log.timestamp).getTime();

      if (sortOrder === "desc") {
        return (
          timestamp < cursorTimestamp ||
          (timestamp === cursorTimestamp && log.id < cursor.id)
        );
      }

      return (
        timestamp > cursorTimestamp ||
        (timestamp === cursorTimestamp && log.id > cursor.id)
      );
    });

    const items = cursorLogs.slice(0, limit);

    const lastItem = items.at(-1);

    const nextCursor =
      lastItem && items.length === limit
        ? encodeCursor({
            timestamp: lastItem.timestamp,
            id: lastItem.id,
          })
        : undefined;

    return HttpResponse.json({
      items,
      nextCursor,
    });
  }),
];
