import type { DataTableFilter } from "@/components/data-table";
import { formatIncidentSeverity, formatIncidentStatus } from "@/lib/formatters";

import type { IncidentSeverity, IncidentStatus } from "../api";

const severities: IncidentSeverity[] = ["low", "medium", "high", "critical"];

const statuses: IncidentStatus[] = [
  "open",
  "investigating",
  "monitoring",
  "resolved",
];

export const incidentTableFilters: DataTableFilter[] = [
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
];
