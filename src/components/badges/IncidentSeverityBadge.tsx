import { Badge } from "@/components/ui";
import type { IncidentSeverity } from "@/features/incidents/api";
import { formatIncidentSeverity } from "@/lib/formatters";

const toneBySeverity: Record<
  IncidentSeverity,
  "default" | "info" | "warning" | "danger"
> = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "danger",
};

interface IncidentSeverityBadgeProps {
  severity: IncidentSeverity;
}

export function IncidentSeverityBadge({
  severity,
}: IncidentSeverityBadgeProps) {
  return (
    <Badge tone={toneBySeverity[severity]}>
      {formatIncidentSeverity(severity)}
    </Badge>
  );
}
