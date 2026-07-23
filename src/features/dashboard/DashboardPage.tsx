import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";
import {
  MetricsGrid,
  RecentDeploymentsCard,
  RecentIncidentsCard,
  ServiceHealthCard,
} from "@/features/dashboard/components";

export function DashboardPage() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          description="Monitor your infrastructure and deployments."
        />

        <MetricsGrid />

        <div className="grid gap-6 lg:grid-cols-3">
          <ServiceHealthCard />
          <RecentDeploymentsCard />
          <RecentIncidentsCard />
        </div>
      </div>
    </Container>
  );
}
