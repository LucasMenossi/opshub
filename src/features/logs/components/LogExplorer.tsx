import { useMemo, useState } from "react";

import { DataTableError, DataTableSkeleton } from "@/components/data-table";
import { formatEnvironment } from "@/lib/formatters";

import { useLogs } from "../hooks";
import type { LogSeverity } from "../api";
import type { Environment } from "@/features/services";
import { createUniqueFilterOptions } from "@/lib/table";
import { LogItem } from "./LogItem";
import { LogFilters } from "./LogsFilter";

export function LogExplorer() {
  const { data, isPending, isError, refetch, isFetching } = useLogs();

  const serviceOptions = useMemo(
    () => createUniqueFilterOptions(data?.items ?? [], (log) => log.service),
    [data],
  );

  const environmentOptions = useMemo(
    () =>
      createUniqueFilterOptions(
        data?.items ?? [],
        (log) => log.environment,
        formatEnvironment,
      ),
    [data],
  );

  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<LogSeverity | "">("");
  const [service, setService] = useState("");
  const [environment, setEnvironment] = useState<Environment | "">("");

  const logs = useMemo(() => {
    return (data?.items ?? []).filter((log) => {
      const value = query.trim().toLowerCase();

      const matchesSearch =
        !value ||
        [
          log.message,
          log.service,
          formatEnvironment(log.environment),
          log.severity,
        ].some((field) => field.toLowerCase().includes(value));

      const matchesSeverity = !severity || log.severity === severity;

      const matchesService = !service || log.service === service;

      const matchesEnvironment =
        !environment || log.environment === environment;

      return (
        matchesSearch && matchesSeverity && matchesService && matchesEnvironment
      );
    });
  }, [data, query, severity, service, environment]);

  if (isPending) {
    return <DataTableSkeleton columns={5} />;
  }

  if (isError) {
    return (
      <DataTableError
        title="Failed to load logs"
        description="The logs could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <LogFilters
        query={query}
        severity={severity}
        service={service}
        environment={environment}
        serviceOptions={serviceOptions}
        environmentOptions={environmentOptions}
        onQueryChange={setQuery}
        onSeverityChange={setSeverity}
        onServiceChange={setService}
        onEnvironmentChange={setEnvironment}
      />

      {logs.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-sm text-muted-foreground">No logs found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <ul className="divide-y">
            {logs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
