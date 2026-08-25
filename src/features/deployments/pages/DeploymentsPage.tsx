import { PageHeader } from "@/components/DataDisplay";
import { Container } from "@/components/UI";

import { DeploymentTable } from "../components/DeploymentTable";

export function DeploymentsPage() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Deployments"
          description="Deployment history across every service"
        />

        <DeploymentTable />
      </div>
    </Container>
  );
}
