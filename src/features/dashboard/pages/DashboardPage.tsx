import { PageHeader } from "@/components/DataDisplay";
import { Container } from "@/components/UI";
import {
  MetricsGrid,
  RecentDeploymentsCard,
  RecentIncidentsCard,
  ServiceHealthCard,
} from "@/features/dashboard/components";

export function DashboardPage() {
  return (
    <Container size="full">
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          description="Monitor your infrastructure and deployments."
        />

        <MetricsGrid />

        <div className="grid gap-6 xl:grid-cols-11">
          <div className="xl:col-span-3">
            <ServiceHealthCard />
          </div>

          <div className="xl:col-span-4">
            <RecentDeploymentsCard />
          </div>

          <div className="xl:col-span-4">
            <RecentIncidentsCard />
          </div>
        </div>
      </div>
    </Container>
  );
}
