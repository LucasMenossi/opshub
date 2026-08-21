import { Container } from "@/components/UI";
import { PageHeader } from "@/components/DataDisplay";

import { LogExplorer } from "../components";

export function LogsPage() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Logs"
          description="Search and inspect application logs."
        />

        <LogExplorer />
      </div>
    </Container>
  );
}
