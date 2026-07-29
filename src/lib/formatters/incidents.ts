import type {
  IncidentSeverity,
  IncidentStatus,
} from "@/features/incidents/api";

const severityLabels: Record<IncidentSeverity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const statusLabels: Record<IncidentStatus, string> = {
  open: "Open",
  investigating: "Investigating",
  resolved: "Resolved",
};

export function formatIncidentSeverity(severity: IncidentSeverity) {
  return severityLabels[severity];
}

export function formatIncidentStatus(status: IncidentStatus) {
  return statusLabels[status];
}
