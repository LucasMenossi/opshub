import { Badge } from "@/components/ui";
import type { Incident, IncidentSeverity } from "@/features/incidents/api";
import { formatDateTime } from "@/lib/formatters";

interface IncidentItemProps {
  incident: Incident;
}

const severityTone: Record<IncidentSeverity, "danger" | "warning" | "default"> =
  {
    critical: "danger",
    warning: "warning",
    resolved: "default",
  };

const severityLabel: Record<IncidentSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  resolved: "Resolved",
};

export function IncidentItem({ incident }: IncidentItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{incident.title}</p>

        <p className="text-sm text-muted-foreground">
          <time dateTime={incident.occurredAt}>
            {formatDateTime(incident.occurredAt)}
          </time>
        </p>
      </div>

      <Badge tone={severityTone[incident.severity]}>
        {severityLabel[incident.severity]}
      </Badge>
    </li>
  );
}
