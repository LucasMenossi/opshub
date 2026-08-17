import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { DataTableError, DataTableSkeleton } from "@/components/data-table";

import { useLogs } from "../hooks";
import type { LogSeverity } from "../api";
import type { Environment } from "@/features/services";
import { LogFilters } from "./LogFilter";
import { LogList } from "./LogList";
import { LogDetails } from "./LogDetails";
import type { LogSortOrder, LogTimeRange } from "../constants";
import { LogMetrics } from "./LogMetrics";
import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { LogPagination } from "./LogPagination";
import { filterLogs, isValidCustomTimeRange } from "../lib/log-filters";
import { sortLogs } from "../lib/log-sort";
import { getTotalPages, paginateLogs } from "../lib/log-pagination";
import { getLogFilterOptions } from "../lib/log-filter-options";
import { getSelectedLog } from "../lib/log-selection";

export function LogExplorer() {
  const { data, isPending, isError, refetch, isFetching } = useLogs({
    refetchInterval: 10000,
  });

  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<LogSeverity | "">("");
  const [service, setService] = useState("");
  const [environment, setEnvironment] = useState<Environment | "">("");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<LogSortOrder>("desc");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [timeRange, setTimeRange] = useState<LogTimeRange>("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const updateFilter = <T,>(setter: Dispatch<SetStateAction<T>>, value: T) => {
    setter(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setSelectedLogId(null);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
    setSelectedLogId(null);
  };

  const { serviceOptions, environmentOptions } = useMemo(
    () => getLogFilterOptions(data?.items ?? []),
    [data],
  );

  const filteredLogs = useMemo(
    () =>
      filterLogs(data?.items ?? [], {
        query,
        severity,
        service,
        environment,
        timeRange,
        customEnd,
        customStart,
      }),
    [
      data,
      query,
      severity,
      service,
      environment,
      timeRange,
      customEnd,
      customStart,
    ],
  );

  const logs = useMemo(
    () => sortLogs(filteredLogs, sortOrder),
    [filteredLogs, sortOrder],
  );

  const totalPages = getTotalPages(logs.length, pageSize);

  const currentPage = Math.min(page, totalPages);

  const paginatedLogs = useMemo(
    () => paginateLogs(logs, currentPage, pageSize),
    [logs, currentPage, pageSize],
  );

  const customTimeRangeValid =
    timeRange !== "custom" || isValidCustomTimeRange(customStart, customEnd);

  const selectedLog = getSelectedLog(paginatedLogs, selectedLogId);

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
      <LogMetrics logs={logs} />

      <LogFilters
        query={query}
        severity={severity}
        service={service}
        environment={environment}
        serviceOptions={serviceOptions}
        environmentOptions={environmentOptions}
        sortOrder={sortOrder}
        timeRange={timeRange}
        customStart={customStart}
        customEnd={customEnd}
        onQueryChange={(value) => updateFilter(setQuery, value)}
        onSeverityChange={(value) => updateFilter(setSeverity, value)}
        onServiceChange={(value) => updateFilter(setService, value)}
        onEnvironmentChange={(value) => updateFilter(setEnvironment, value)}
        onSortOrderChange={(value) => updateFilter(setSortOrder, value)}
        onTimeRangeChange={(value) => {
          updateFilter(setTimeRange, value);

          if (value !== "custom") {
            setCustomStart("");
            setCustomEnd("");
          }
        }}
        onCustomStartChange={(value) => {
          setCustomStart(value);
          setPage(1);
        }}
        onCustomEndChange={(value) => {
          setCustomEnd(value);
          setPage(1);
        }}
      />

      <button
        type="button"
        onClick={() => setDetailsOpen((previous) => !previous)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
      >
        {detailsOpen ? (
          <PanelRightClose className="h-4 w-4" />
        ) : (
          <PanelRightOpen className="h-4 w-4" />
        )}

        {detailsOpen ? "Hide Details" : "Show Details"}
      </button>

      {!customTimeRangeValid ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Select a valid start and end date.
          </p>
        </div>
      ) : logs.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-sm text-muted-foreground">No logs found.</p>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            detailsOpen ? "lg:grid-cols-[2fr_1fr]" : "grid-cols-1",
          )}
        >
          <div className="min-w-0 space-y-4">
            <LogList
              logs={paginatedLogs}
              selectedLogId={selectedLog?.id ?? null}
              onSelect={(log) => setSelectedLogId(log.id)}
            />

            <LogPagination
              page={currentPage}
              pageSize={pageSize}
              totalPages={totalPages}
              totalResults={logs.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>

          {detailsOpen && (
            <div className="sticky top-6 h-fit rounded-lg border bg-card">
              <LogDetails log={selectedLog} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
