import { PageHeader } from "@/components/DataDisplay";
import { Container } from "@/components/UI";

import { ServiceTable } from "../components";

export function ServicesPage() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Services"
          description="Manage and monitor your platform services."
        />

        <ServiceTable />
      </div>
    </Container>
  );
}
