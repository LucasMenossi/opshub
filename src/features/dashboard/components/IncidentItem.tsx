import { Badge } from "@/components/ui";

import type { Incident } from "../data/incidents";

interface IncidentItemProps {
  incident: Incident;
}

const severityTone = {
  critical: "danger",
  warning: "warning",
  resolved: "default",
} as const;

const severityLabel = {
  critical: "Critical",
  warning: "Warning",
  resolved: "Resolved",
} as const;

export function IncidentItem({ incident }: IncidentItemProps) {
  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{incident.title}</p>
        <p className="text-sm text-muted-foreground">{incident.occurredAt}</p>
      </div>

      <Badge tone={severityTone[incident.severity]}>
        {severityLabel[incident.severity]}
      </Badge>
    </li>
  );
}
