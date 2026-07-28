export type IncidentSeverity = "critical" | "warning" | "resolved";

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  occurredAt: string;
}
