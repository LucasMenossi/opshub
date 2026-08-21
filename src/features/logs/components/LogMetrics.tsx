import { useMemo } from "react";

import type { LogEntry } from "../api";
import { MetricCard } from "@/components/DataDisplay";

interface LogMetricsProps {
  logs: LogEntry[];
}

export function LogMetrics({ logs }: LogMetricsProps) {
  const metrics = useMemo(() => {
    const errorLogs = logs.filter(
      (log) => log.severity === "error" || log.severity === "fatal",
    ).length;

    const warningLogs = logs.filter((log) => log.severity === "warning").length;

    const services = new Set(logs.map((log) => log.service)).size;

    return {
      total: logs.length,
      errors: errorLogs,
      warnings: warningLogs,
      services,
    };
  }, [logs]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Total Logs" value={metrics.total} />

      <MetricCard title="Errors" value={metrics.errors} />

      <MetricCard title="Warnings" value={metrics.warnings} />

      <MetricCard title="Services" value={metrics.services} />
    </div>
  );
}
