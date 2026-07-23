import { useParams } from "@tanstack/react-router";

import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";

import { useServices } from "../hooks";
import { ServiceMetricsCard, ServiceOverviewCard } from "../components";

export function ServiceDetailsPage() {
  const { serviceId } = useParams({
    from: "/services/$serviceId",
  });

  const { data = [] } = useServices();

  const service = data.find((service) => service.id === serviceId);

  if (!service) {
    return (
      <Container>
        <div className="py-12 text-center">
          <h2 className="text-xl font-semibold">Service not found</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-8">
        <PageHeader title={service.name} description="Service details" />

        <ServiceOverviewCard service={service} />

        <ServiceMetricsCard service={service} />
      </div>
    </Container>
  );
}
