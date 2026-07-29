import { Badge } from "@/components/ui";
import type { IncidentStatus } from "@/features/incidents/api";
import { formatIncidentStatus } from "@/lib/formatters";

const toneByStatus: Record<IncidentStatus, "warning" | "danger" | "success"> = {
  open: "warning",
  investigating: "danger",
  resolved: "success",
};

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
}

export function IncidentStatusBadge({ status }: IncidentStatusBadgeProps) {
  return (
    <Badge tone={toneByStatus[status]}>{formatIncidentStatus(status)}</Badge>
  );
}
