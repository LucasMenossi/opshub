export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus = "open" | "investigating" | "resolved";

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

export type IncidentTimelineEventType =
  "created" | "owner_assigned" | "status_changed" | "deployment" | "resolved";

export interface IncidentTimelineEvent {
  id: string;
  type: IncidentTimelineEventType;
  title: string;
  description?: string;
  occurredAt: string;
}

export interface IncidentDetails extends Incident {
  description: string;
  resolutionNotes?: string;
  timeline: IncidentTimelineEvent[];
  relatedDeploymentIds: string[];
}
