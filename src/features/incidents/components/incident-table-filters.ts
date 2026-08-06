import type { DataTableFilter } from "@/components/data-table";
import { formatIncidentSeverity, formatIncidentStatus } from "@/lib/formatters";

import type { Incident, IncidentSeverity, IncidentStatus } from "../api";
import {
  createStaticFilterOptions,
  createUniqueFilterOptions,
} from "@/lib/table";

const severities: IncidentSeverity[] = ["low", "medium", "high", "critical"];

const statuses: IncidentStatus[] = ["open", "investigating", "resolved"];

export function getIncidentTableFilters(
  incidents: Incident[],
): DataTableFilter[] {
  return [
    {
      columnId: "severity",
      label: "Severity",
      options: createStaticFilterOptions(severities, formatIncidentSeverity),
    },
    {
      columnId: "status",
      label: "Status",
      options: createStaticFilterOptions(statuses, formatIncidentStatus),
    },
    {
      columnId: "service",
      label: "Service",
      options: createUniqueFilterOptions(
        incidents,
        (incident) => incident.service,
      ),
    },
    {
      columnId: "owner",
      label: "Owner",
      options: createUniqueFilterOptions(
        incidents,
        (incident) => incident.owner,
      ),
    },
  ];
}
