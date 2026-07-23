import { Badge } from "@/components/ui";

import type { ServiceStatus } from "@/features/services/data/services";

const toneByStatus: Record<ServiceStatus, "success" | "warning" | "danger"> = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
};

const labelByStatus: Record<ServiceStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
}

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  return <Badge tone={toneByStatus[status]}>{labelByStatus[status]}</Badge>;
}
