export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
  "open" | "investigating" | "monitoring" | "resolved";

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  owner: string;
  service: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
}
