export type IncidentSeverity = "critical" | "warning" | "resolved";

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  occurredAt: string;
}

export const incidents: Incident[] = [
  {
    id: "1",
    title: "Database latency",
    severity: "critical",
    occurredAt: "15 minutes ago",
  },
  {
    id: "2",
    title: "Authentication timeout",
    severity: "warning",
    occurredAt: "1 hour ago",
  },
  {
    id: "3",
    title: "CDN cache miss",
    severity: "resolved",
    occurredAt: "3 hours ago",
  },
];
