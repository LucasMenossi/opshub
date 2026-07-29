import type { Incident } from "../api";

export const incidents: Incident[] = [
  {
    id: "1",
    title: "Database latency",
    severity: "critical",
    status: "investigating",
    owner: "Database Team",
    service: "Database",
    serviceId: "database",
    createdAt: "2026-07-28T16:45:00Z",
    updatedAt: "2026-07-28T17:15:00Z",
  },
  {
    id: "2",
    title: "Authentication timeout",
    severity: "high",
    status: "monitoring",
    owner: "Identity Team",
    service: "Authentication",
    serviceId: "authentication",
    createdAt: "2026-07-28T16:00:00Z",
    updatedAt: "2026-07-28T16:30:00Z",
  },
  {
    id: "3",
    title: "CDN cache miss",
    severity: "medium",
    status: "resolved",
    owner: "Infrastructure Team",
    service: "CDN",
    serviceId: "cdn",
    createdAt: "2026-07-28T14:00:00Z",
    updatedAt: "2026-07-28T15:00:00Z",
  },
];
