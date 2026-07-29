import type { DataTableFilter } from "@/components/data-table";
import { formatIncidentSeverity, formatIncidentStatus } from "@/lib/formatters";

import type { Incident, IncidentSeverity, IncidentStatus } from "../api";

const severities: IncidentSeverity[] = ["low", "medium", "high", "critical"];

const statuses: IncidentStatus[] = [
  "open",
  "investigating",
  "monitoring",
  "resolved",
];

export function getIncidentTableFilters(
  incidents: Incident[],
): DataTableFilter[] {
  const services = Array.from(
    new Set(incidents.map((incident) => incident.service)),
  ).sort();

  const owners = Array.from(
    new Set(incidents.map((incident) => incident.owner)),
  ).sort();

  return [
    {
      columnId: "severity",
      label: "Severities",
      options: severities.map((severity) => ({
        value: severity,
        label: formatIncidentSeverity(severity),
      })),
    },
    {
      columnId: "status",
      label: "Statuses",
      options: statuses.map((status) => ({
        value: status,
        label: formatIncidentStatus(status),
      })),
    },
    {
      columnId: "service",
      label: "Services",
      options: services.map((service) => ({
        value: service,
        label: service,
      })),
    },
    {
      columnId: "owner",
      label: "Owners",
      options: owners.map((owner) => ({
        value: owner,
        label: owner,
      })),
    },
  ];
}
