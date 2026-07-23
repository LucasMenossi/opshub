import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui";

import type { Deployment } from "../api";

const statusTone = {
  pending: "default",
  running: "info",
  successful: "success",
  failed: "danger",
  cancelled: "default",
} as const;

const statusLabel = {
  pending: "Pending",
  running: "Running",
  successful: "Successful",
  failed: "Failed",
  cancelled: "Cancelled",
} as const;

const environmentLabel = {
  production: "Production",
  staging: "Staging",
} as const;

interface DeploymentTableRowProps {
  deployment: Deployment;
}

export function DeploymentTableRow({ deployment }: DeploymentTableRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-6 py-4">
        <Link
          to="/services/$serviceId"
          params={{
            serviceId: deployment.serviceId,
          }}
          className="font-medium hover:underline"
        >
          {deployment.service}
        </Link>
      </td>

      <td className="px-6 py-4 font-medium">{deployment.version}</td>

      <td className="px-6 py-4">{environmentLabel[deployment.environment]}</td>

      <td className="px-6 py-4">
        <Badge tone={statusTone[deployment.status]}>
          {statusLabel[deployment.status]}
        </Badge>
      </td>

      <td className="px-6 py-4">{deployment.author}</td>

      <td className="px-6 py-4 text-muted-foreground">
        {deployment.deployedAt}
      </td>
    </tr>
  );
}
