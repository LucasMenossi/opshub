import { Badge } from "@/components/ui";
import type { ServiceStatus } from "@/features/services/data/services";
import { formatServiceStatus } from "@/lib/formatters";

const toneByStatus: Record<ServiceStatus, "success" | "warning" | "danger"> = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
};

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
}

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  return (
    <Badge tone={toneByStatus[status]}>{formatServiceStatus(status)}</Badge>
  );
}
