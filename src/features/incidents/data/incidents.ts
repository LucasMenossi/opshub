import type { Incident } from "../api";

export const incidents: Incident[] = [
  {
    id: "1",
    title: "Database latency",
    severity: "critical",
    occurredAt: "2026-07-28T16:45:00Z",
  },
  {
    id: "2",
    title: "Authentication timeout",
    severity: "warning",
    occurredAt: "2026-07-28T16:00:00Z",
  },
  {
    id: "3",
    title: "CDN cache miss",
    severity: "resolved",
    occurredAt: "2026-07-28T14:00:00Z",
  },
];
