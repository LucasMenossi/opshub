import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";

import { DeploymentTable } from "../components";

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
