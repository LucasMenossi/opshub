import { Card } from "@/components/ui";
import { DeploymentStatusBadge } from "@/components/badges";
import type { Deployment } from "@/features/deployments/api";
import { formatDateTime, formatEnvironment } from "@/lib/formatters";

interface IncidentRelatedDeploymentsProps {
  deployments: Deployment[];
}

export function IncidentRelatedDeployments({
  deployments,
}: IncidentRelatedDeploymentsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Related deployments</h2>

      {deployments.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No deployments are associated with this incident.
        </p>
      ) : (
        <ul className="mt-4 divide-y">
          {deployments.map((deployment) => (
            <li
              key={deployment.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <p className="font-medium">{deployment.version}</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatEnvironment(deployment.environment)}
                  {" · "}
                  {deployment.author}
                  {" · "}
                  <time dateTime={deployment.deployedAt}>
                    {formatDateTime(deployment.deployedAt)}
                  </time>
                </p>
              </div>

              <DeploymentStatusBadge status={deployment.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
