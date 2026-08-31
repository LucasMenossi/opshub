import { Card, CardHeader } from "@/components/UI";

import type { Service } from "../api";

interface ServiceMetricsCardProps {
  service: Service;
}

export function ServiceMetricsCard({ service }: ServiceMetricsCardProps) {
  return (
    <Card>
      <div className="p-6 pb-0">
        <CardHeader
          title="Metrics"
          description="Current service health indicators"
        />
      </div>

      <div className="grid grid-cols-3 gap-8 p-6">
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
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
