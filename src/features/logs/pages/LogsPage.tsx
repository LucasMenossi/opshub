import { Container } from "@/components/ui";
import { PageHeader } from "@/components/data-display";

export function LogsPage() {
  return (
    <Container>
      <PageHeader
        title="Logs"
        description="Search and inspect application logs."
      />
    </Container>
  );
}
