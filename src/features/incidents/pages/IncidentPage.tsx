import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";

import { IncidentTable } from "../components";

export function IncidentsPage() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Incidents"
          description="Monitor operational incidents across your services"
        />

        <IncidentTable />
      </div>
    </Container>
  );
}
