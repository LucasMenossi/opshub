import { useMemo, useState } from "react";

import { DataTableError, DataTableSkeleton } from "@/components/data-table";
import { formatEnvironment } from "@/lib/formatters";

import { useLogs } from "../hooks";
import { LogItem } from "./LogItem";
import { SearchInput } from "@/components/search-input";

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
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search logs..."
        className="relative max-w-md"
      />

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
