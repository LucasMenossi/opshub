import { Card, CardHeader } from "@/components/UI";

import { useRecentDeployments } from "../hooks";
import { DeploymentItem } from "./DeploymentItem";

export function RecentDeploymentsCard() {
  const { data = [] } = useRecentDeployments();

  return (
    <Card className="p-6">
      <CardHeader
        title="Recent Deployments"
        description="Latest deployment activity."
      />

      <ul className="divide-y">
        {data.map((deployment) => (
          <DeploymentItem key={deployment.id} deployment={deployment} />
        ))}
      </ul>
    </Card>
  );
}
