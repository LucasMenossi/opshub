import type { Deployment } from "@/features/deployments/api";
import { DeploymentStatusBadge } from "@/components/Badges";
import { formatDateTime } from "@/lib/formatters";

interface DeploymentItemProps {
  deployment: Deployment;
}

export function DeploymentItem({ deployment }: DeploymentItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{deployment.service}</p>

        <p className="text-sm text-muted-foreground">
          {deployment.version} •{" "}
          <time dateTime={deployment.deployedAt}>
            {formatDateTime(deployment.deployedAt)}
          </time>
        </p>
      </div>

      <DeploymentStatusBadge status={deployment.status} />
    </li>
  );
}
