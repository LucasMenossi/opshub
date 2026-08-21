import { useParams } from "@tanstack/react-router";

import { PageHeader } from "@/components/DataDisplay";
import { Container } from "@/components/UI";

import { useServices } from "../hooks";
import { ServiceMetricsCard, ServiceOverviewCard } from "../components";
import { PageErrorState, PageLoadingState } from "@/components/PageState";

export function ServiceDetailsPage() {
  const { serviceId } = useParams({
    from: "/services/$serviceId",
  });

  const { data = [], isError, isPending, isFetching, refetch } = useServices();

  const service = data.find((service) => service.id === serviceId);

  if (isPending) {
    return <PageLoadingState message="Loading service..." />;
  }

  if (isError || !service) {
    return (
      <PageErrorState
        title="Failed to load service"
        description="The service could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
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
