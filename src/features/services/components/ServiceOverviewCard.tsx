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
      <div className="p-6 pb-0">
        <CardHeader
          title="Overview"
          description="General service information"
        />
      </div>

      <dl className="grid grid-cols-2 gap-x-16 gap-y-6 p-6">
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
    <div className="space-y-2">
      <dt className="text-sm text-muted-foreground">{label}</dt>

      <dd>{children}</dd>
    </div>
  );
}
