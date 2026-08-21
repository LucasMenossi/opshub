import { Badge, Card, CardHeader } from "@/components/UI";

import type { ReactNode } from "react";

import type { Service } from "../api";

const statusTone = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
} as const;

const statusLabel = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
} as const;

const environmentLabel = {
  production: "Production",
  staging: "Staging",
} as const;

interface ServiceOverviewCardProps {
  service: Service;
}

export function ServiceOverviewCard({ service }: ServiceOverviewCardProps) {
  return (
    <Card>
      <CardHeader title="Overview" description="General service information" />

      <dl className="grid gap-6 p-6 sm:grid-cols-2">
        <OverviewItem label="Status">
          <Badge tone={statusTone[service.status]}>
            {statusLabel[service.status]}
          </Badge>
        </OverviewItem>

        <OverviewItem label="Version">
          <span className="font-medium">{service.version}</span>
        </OverviewItem>

        <OverviewItem label="Environment">
          <span className="font-medium">
            {environmentLabel[service.environment]}
          </span>
        </OverviewItem>

        <OverviewItem label="Service ID">
          <span className="font-mono text-sm">{service.id}</span>
        </OverviewItem>

        <OverviewItem label="Owner">
          <span className="font-medium">{service.owner}</span>
        </OverviewItem>
      </dl>
    </Card>
  );
}

interface OverviewItemProps {
  label: string;
  children: ReactNode;
}

function OverviewItem({ label, children }: OverviewItemProps) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>

      <dd className="mt-2">{children}</dd>
    </div>
  );
}
