import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";

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
