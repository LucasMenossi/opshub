import { useParams } from "@tanstack/react-router";

import { PageHeader } from "@/components/data-display";
import { Card, Container } from "@/components/ui";
import { useDeployments } from "@/features/deployments/hooks";

import { useIncident } from "../hooks";
import {
  IncidentOverviewCard,
  IncidentRelatedDeployments,
  IncidentTimeline,
} from "../components";

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
    return (
      <Container>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Loading incident...</p>
        </Card>
      </Container>
    );
  }

  if (isError || !incident) {
    return (
      <Container>
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Failed to load incident</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The incident could not be retrieved.
              </p>
            </div>

            <button
              type="button"
              disabled={isFetching}
              onClick={() => void refetch()}
              className="h-9 rounded-lg border px-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              {isFetching ? "Retrying..." : "Retry"}
            </button>
          </div>
        </Card>
      </Container>
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
