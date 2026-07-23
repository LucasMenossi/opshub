import { Badge } from "@/components/ui";

import type { Deployment } from "../data/deployments";

interface DeploymentItemProps {
  deployment: Deployment;
}

const statusTone = {
  success: "success",
  running: "info",
  failed: "danger",
} as const;

const statusLabel = {
  success: "Success",
  running: "Running",
  failed: "Failed",
} as const;

export function DeploymentItem({ deployment }: DeploymentItemProps) {
  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{deployment.service}</p>
        <p className="text-sm text-muted-foreground">
          {deployment.version} • {deployment.deployedAt}
        </p>
      </div>

      <Badge tone={statusTone[deployment.status]}>
        {statusLabel[deployment.status]}
      </Badge>
    </li>
  );
}
