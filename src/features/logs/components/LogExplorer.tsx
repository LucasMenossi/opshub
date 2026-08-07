import { useMemo, useState } from "react";

import { DataTableError, DataTableSkeleton } from "@/components/data-table";
import { formatEnvironment } from "@/lib/formatters";

import { useLogs } from "../hooks";
import type { LogSeverity } from "../api";
import type { Environment } from "@/features/services";
import { createUniqueFilterOptions } from "@/lib/table";
import { LogFilters } from "./LogFilter";
import { LogList } from "./LogList";
import { LogDetails } from "./LogDetails";
import type { LogSortOrder } from "../constants";

export function LogExplorer() {
  const { data, isPending, isError, refetch, isFetching } = useLogs();

  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<LogSeverity | "">("");
  const [service, setService] = useState("");
  const [environment, setEnvironment] = useState<Environment | "">("");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<LogSortOrder>("desc");

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

  const filteredLogs = useMemo(() => {
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

  const logs = useMemo(() => {
    return [...filteredLogs].sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();

      return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
    });
  }, [filteredLogs, sortOrder]);

  const selectedLog = useMemo(() => {
    if (logs.length === 0) {
      return null;
    }

    return logs.find((log) => log.id === selectedLogId) ?? logs[0];
  }, [logs, selectedLogId]);

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
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {logs.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-sm text-muted-foreground">No logs found.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <LogList
            logs={logs}
            selectedLogId={selectedLog?.id ?? null}
            onSelect={(log) => setSelectedLogId(log.id)}
          />

          <div className="sticky top-6 h-fit rounded-lg border bg-card">
            <LogDetails log={selectedLog} />
          </div>
        </div>
      )}
    </div>
  );
}
