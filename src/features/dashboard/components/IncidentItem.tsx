import { IncidentSeverityBadge } from "@/components/badges";
import type { Incident } from "@/features/incidents/api";
import { formatDateTime } from "@/lib/formatters";

interface IncidentItemProps {
  incident: Incident;
}

export function IncidentItem({ incident }: IncidentItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{incident.title}</p>

        <p className="text-sm text-muted-foreground">
          <time dateTime={incident.createdAt}>
            {formatDateTime(incident.createdAt)}
          </time>
        </p>
      </div>

      <IncidentSeverityBadge severity={incident.severity} />
    </li>
  );
}
