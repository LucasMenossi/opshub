import { Card, CardHeader } from "@/components/ui";

import type { Service } from "../data/services";

interface ServiceMetricsCardProps {
  service: Service;
}

export function ServiceMetricsCard({ service }: ServiceMetricsCardProps) {
  return (
    <Card>
      <CardHeader
        title="Metrics"
        description="Current service health indicators"
      />

      <div className="grid gap-6 p-6 sm:grid-cols-3">
        <Metric label="Uptime" value={`${service.uptime.toFixed(2)}%`} />

        <Metric label="Version" value={service.version} />

        <Metric label="Environment" value={service.environment} />
      </div>
    </Card>
  );
}

interface MetricProps {
  label: string;
  value: string;
}

function Metric({ label, value }: MetricProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
