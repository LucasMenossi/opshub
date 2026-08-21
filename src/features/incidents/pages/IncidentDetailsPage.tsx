import { useParams } from "@tanstack/react-router";

import { PageHeader } from "@/components/DataDisplay";
import { Card, Container } from "@/components/UI";
import { useDeployments } from "@/features/deployments/hooks";

import { useIncident } from "../hooks";
import {
  IncidentOverviewCard,
  IncidentRelatedDeployments,
  IncidentTimeline,
} from "../components";
import { PageErrorState, PageLoadingState } from "@/components/PageState";

export function IncidentDetailsPage() {
  const { incidentId } = useParams({
    from: "/incidents/$incidentId",
  });

  const {
    data: incident,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useIncident(incidentId);

  const { data: deployments = [] } = useDeployments();

  if (isPending) {
    return <PageLoadingState message="Loading incident..." />;
  }

  if (isError || !incident) {
    return (
      <PageErrorState
        title="Failed to load incident"
        description="The incident could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
    );
  }

  const relatedDeploymentIds = incident.relatedDeploymentIds ?? [];

  const relatedDeployments = deployments.filter((deployment) =>
    relatedDeploymentIds.includes(deployment.id),
  );

  return (
    <Container>
      <div className="space-y-8">
        <PageHeader title={incident.title} description="Incident details" />

        <IncidentOverviewCard incident={incident} />

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Description</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {incident.description}
          </p>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          <IncidentTimeline events={incident.timeline ?? []} />

          <IncidentRelatedDeployments deployments={relatedDeployments} />
        </div>

        {incident.resolutionNotes && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold">Resolution notes</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {incident.resolutionNotes}
            </p>
          </Card>
        )}
      </div>
    </Container>
  );
}
