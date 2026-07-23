import { Activity, AlertTriangle, Rocket, Server } from "lucide-react";

import { MetricCard } from "./MetricCard";

import { useDashboardMetrics } from "../hooks";

export function MetricsGrid() {
  const { data } = useDashboardMetrics();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Services"
        value={data?.services ?? 0}
        description="Registered services"
        icon={Server}
      />

      <MetricCard
        title="Deployments"
        value={data?.deployments ?? 0}
        description="Recent deployments"
        icon={Rocket}
      />

      <MetricCard
        title="Incidents"
        value={data?.incidents ?? 0}
        description="Active incidents"
        icon={AlertTriangle}
      />

      <MetricCard
        title="Uptime"
        value={`${data?.uptime ?? 0}%`}
        description="Platform availability"
        icon={Activity}
      />
    </div>
  );
}
