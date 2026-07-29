import type { IncidentDetails } from "../api";
import { incidents } from "./incidents";

export const incidentDetails: IncidentDetails[] = incidents.map((incident) => ({
  ...incident,

  description:
    "Operational incident affecting normal service behavior. The engineering team is investigating the cause and impact.",

  resolutionNotes:
    incident.status === "resolved"
      ? "The incident was resolved and service behavior returned to normal."
      : undefined,

  relatedDeploymentIds: [],

  timeline: [
    {
      id: `${incident.id}-created`,
      type: "created",
      title: "Incident created",
      occurredAt: incident.createdAt,
    },
  ],
}));
