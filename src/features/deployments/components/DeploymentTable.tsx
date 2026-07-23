import { Card } from "@/components/ui";

import { useDeployments } from "../hooks";
import { DeploymentTableRow } from "./DeploymentTableRow";

export function DeploymentTable() {
  const { data = [], isPending, isError } = useDeployments();

  if (isPending) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading deployments...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Failed to load deployments.</p>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">No deployments found.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr className="text-left text-sm text-muted-foreground">
            <th className="px-6 py-3 font-medium">Service</th>
            <th className="px-6 py-3 font-medium">Version</th>
            <th className="px-6 py-3 font-medium">Environment</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Author</th>
            <th className="px-6 py-3 font-medium">Deployed</th>
          </tr>
        </thead>

        <tbody>
          {data.map((deployment) => (
            <DeploymentTableRow key={deployment.id} deployment={deployment} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
