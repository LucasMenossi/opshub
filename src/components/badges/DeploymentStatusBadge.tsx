import { Badge } from "@/components/ui";

import type { DeploymentStatus } from "@/features/deployments/api";

const toneByStatus: Record<
  DeploymentStatus,
  "default" | "info" | "success" | "warning" | "danger"
> = {
  pending: "default",
  running: "info",
  successful: "success",
  failed: "danger",
  cancelled: "default",
};

const labelByStatus: Record<DeploymentStatus, string> = {
  pending: "Pending",
  running: "Running",
  successful: "Successful",
  failed: "Failed",
  cancelled: "Cancelled",
};

interface DeploymentStatusBadgeProps {
  status: DeploymentStatus;
}

export function DeploymentStatusBadge({ status }: DeploymentStatusBadgeProps) {
  return <Badge tone={toneByStatus[status]}>{labelByStatus[status]}</Badge>;
}
