import { formatIncidentSeverity, formatIncidentStatus } from "@/lib/formatters";
import type { FilterOption } from "@/lib/types/filterOption";

import type { Incident, IncidentSeverity, IncidentStatus } from "../../api";
import {
  createStaticFilterOptions,
  createUniqueFilterOptions,
} from "@/lib/table";

const severities: IncidentSeverity[] = ["low", "medium", "high", "critical"];

const statuses: IncidentStatus[] = ["open", "investigating", "resolved"];

export function getIncidentFilterOptions(incidents: Incident[]): {
  severity: FilterOption[];
  status: FilterOption[];
  service: FilterOption[];
  owner: FilterOption[];
} {
  return {
    severity: createStaticFilterOptions(severities, formatIncidentSeverity),
    status: createStaticFilterOptions(statuses, formatIncidentStatus),
    service: createUniqueFilterOptions(incidents, (incident) => incident.service),
    owner: createUniqueFilterOptions(incidents, (incident) => incident.owner),
  };
}
