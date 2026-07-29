import { Link } from "@tanstack/react-router";

import {
  IncidentSeverityBadge,
  IncidentStatusBadge,
} from "@/components/badges";
import { Card } from "@/components/ui";
import { formatDateTime } from "@/lib/formatters";

import type { IncidentDetails } from "../api";

interface IncidentOverviewCardProps {
  incident: IncidentDetails;
}

export function IncidentOverviewCard({ incident }: IncidentOverviewCardProps) {
  return (
    <Card className="p-6">
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="text-sm text-muted-foreground">Severity</dt>
          <dd className="mt-2">
            <IncidentSeverityBadge severity={incident.severity} />
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted-foreground">Status</dt>
          <dd className="mt-2">
            <IncidentStatusBadge status={incident.status} />
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted-foreground">Owner</dt>
          <dd className="mt-2 font-medium">{incident.owner}</dd>
        </div>

        <div>
          <dt className="text-sm text-muted-foreground">Service</dt>
          <dd className="mt-2">
            <Link
              to="/services/$serviceId"
              params={{ serviceId: incident.serviceId }}
              className="font-medium hover:underline"
            >
              {incident.service}
            </Link>
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted-foreground">Created</dt>
          <dd className="mt-2">
            <time dateTime={incident.createdAt}>
              {formatDateTime(incident.createdAt)}
            </time>
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted-foreground">Incident ID</dt>
          <dd className="mt-2 font-mono text-sm">{incident.id}</dd>
        </div>
      </dl>
    </Card>
  );
}
