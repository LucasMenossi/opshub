import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { DataTableError, DataTableSkeleton } from "@/components/data-table";
import { formatEnvironment } from "@/lib/formatters";

import { useLogs } from "../hooks";
import { LogItem } from "./LogItem";

export function LogExplorer() {
  const { data, isPending, isError, refetch, isFetching } = useLogs();

  const [query, setQuery] = useState("");

  const logs = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return data?.items ?? [];
    }

    return (data?.items ?? []).filter((log) =>
      [
        log.message,
        log.service,
        formatEnvironment(log.environment),
        log.severity,
      ].some((field) => field.toLowerCase().includes(value)),
    );
  }, [data, query]);

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
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search logs..."
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <ul className="divide-y rounded-lg border bg-card">
          {logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </ul>
      </div>
    </div>
  );
}
