import type { Incident, IncidentDetails } from "../api";
import { incidents } from "./incidents";

function getIncident(id: string): Incident {
  const incident = incidents.find((incident) => incident.id === id);

  if (!incident) {
    throw new Error(`Incident ${id} not found`);
  }

  return incident;
}

export const incidentDetails: IncidentDetails[] = [
  {
    ...getIncident("1"),

    description:
      "Elevated database latency is affecting requests from the API service.",

    relatedDeploymentIds: ["1"],

    timeline: [
      {
        id: "1-created",
        type: "created",
        title: "Incident created",
        description: "Elevated database latency was detected.",
        occurredAt: getIncident("1").createdAt,
      },
      {
        id: "1-owner",
        type: "owner_assigned",
        title: "Owner assigned",
        description: "The incident was assigned for investigation.",
        occurredAt: "2026-07-28T16:50:00Z",
      },
      {
        id: "1-investigating",
        type: "status_changed",
        title: "Investigation started",
        description: "The team began investigating database response times.",
        occurredAt: "2026-07-28T17:00:00Z",
      },
      {
        id: "1-deployment",
        type: "deployment",
        title: "Deployment identified",
        description:
          "A recent deployment was identified as relevant to the investigation.",
        occurredAt: "2026-07-28T17:10:00Z",
      },
    ],
  },

  {
    ...getIncident("2"),

    description: "Authentication requests experienced intermittent timeouts.",

    relatedDeploymentIds: [],

    timeline: [
      {
        id: "2-created",
        type: "created",
        title: "Incident created",
        occurredAt: getIncident("2").createdAt,
      },
      {
        id: "2-investigating",
        type: "status_changed",
        title: "Investigation started",
        occurredAt: "2026-07-28T16:10:00Z",
      },
    ],
  },

  {
    ...getIncident("3"),

    description:
      "An elevated CDN cache miss rate increased origin traffic temporarily.",

    resolutionNotes:
      "Cache behavior returned to expected levels and service operation was verified.",

    relatedDeploymentIds: [],

    timeline: [
      {
        id: "3-created",
        type: "created",
        title: "Incident created",
        occurredAt: getIncident("3").createdAt,
      },
      {
        id: "3-resolved",
        type: "resolved",
        title: "Incident resolved",
        description: "CDN cache behavior returned to normal.",
        occurredAt: "2026-07-28T15:20:00Z",
      },
    ],
  },
];
