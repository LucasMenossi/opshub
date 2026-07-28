import { Badge } from "@/components/ui";
import type { DeploymentStatus } from "@/features/deployments/api";
import { formatDeploymentStatus } from "@/lib/formatters";

const toneByStatus: Record<
  DeploymentStatus,
  "default" | "info" | "success" | "danger"
> = {
  pending: "default",
  running: "info",
  successful: "success",
  failed: "danger",
  cancelled: "default",
};

interface DeploymentStatusBadgeProps {
  status: DeploymentStatus;
}

export function DeploymentStatusBadge({ status }: DeploymentStatusBadgeProps) {
  return (
    <Badge tone={toneByStatus[status]}>{formatDeploymentStatus(status)}</Badge>
  );
}
