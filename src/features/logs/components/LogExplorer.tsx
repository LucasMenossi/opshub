import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import { PanelRightClose, PanelRightOpen } from "lucide-react";

import { DataTableError, DataTableSkeleton } from "@/components/DataTable";
import type { Environment } from "@/features/services";
import { useServices } from "@/features/services";
import type { FilterOption } from "@/lib/types";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";

import type { LogSeverity } from "../api";
import type { LogSortOrder, LogTimeRange } from "../constants";
import { useLogs } from "../hooks";
import { getSelectedLog } from "../utils";

import { LogDetails } from "./LogDetails";
import {
  LogFilters,
  LogEnvironmentFilter,
  LogSearch,
  LogServiceFilter,
  LogSeverityFilter,
  LogSortFilter,
  LogTimeRangeFilter,
} from "./LogFilters";
import { LogList } from "./LogList";
import { LogMetrics } from "./LogMetrics";

const SEARCH_DEBOUNCE_DELAY = 300;

export function LogExplorer() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<LogSeverity | "">("");
  const [service, setService] = useState("");
  const [environment, setEnvironment] = useState<Environment | "">("");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<LogSortOrder>("desc");
  const [detailsOpen, setDetailsOpen] = useState(true);

  const [timeRange, setTimeRange] = useState<LogTimeRange>("");

  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const [appliedCustomStart, setAppliedCustomStart] = useState("");
  const [appliedCustomEnd, setAppliedCustomEnd] = useState("");

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_DELAY);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLogs({
    search: debouncedQuery || undefined,
    severity: severity || undefined,
    service: service || undefined,
    environment: environment || undefined,
    sortOrder,
    timeRange,
    customStart: appliedCustomStart,
    customEnd: appliedCustomEnd,
    refetchInterval: 10000,
  });

  const { data: servicesData } = useServices();

  const logs = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const serviceOptions = useMemo(
    () =>
      servicesData?.map((service) => ({
        value: service.name,
        label: service.name,
      })) ?? [],
    [servicesData],
  );

  const environmentOptions = [
    { value: "production", label: "Production" },
    { value: "staging", label: "Staging" },
  ] satisfies FilterOption[];

  const selectedLog = useMemo(
    () => getSelectedLog(logs, selectedLogId),
    [logs, selectedLogId],
  );

  const updateFilter = <T,>(setter: Dispatch<SetStateAction<T>>, value: T) => {
    setter(value);
    setSelectedLogId(null);
  };

  const handleTimeRangeChange = (value: LogTimeRange) => {
    updateFilter(setTimeRange, value);

    if (value !== "custom") {
      setCustomStart("");
      setCustomEnd("");
      setAppliedCustomStart("");
      setAppliedCustomEnd("");
    }
  };

  const handleCustomStartChange = (value: string) => {
    setCustomStart(value);
    setSelectedLogId(null);
  };

  const handleCustomEndChange = (value: string) => {
    setCustomEnd(value);
    setSelectedLogId(null);
  };

  const handleApplyCustomRange = () => {
    setAppliedCustomStart(customStart);
    setAppliedCustomEnd(customEnd);
    setSelectedLogId(null);
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage();
  };

  if (isLoading) {
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

      <div className="space-y-2">
        <LogFilters>
          <LogSearch
            value={query}
            onChange={(value) => updateFilter(setQuery, value)}
          />

          <LogSeverityFilter
            value={severity}
            onChange={(value) => updateFilter(setSeverity, value)}
          />

          <LogServiceFilter
            value={service}
            options={serviceOptions}
            onChange={(value) => updateFilter(setService, value)}
          />

          <LogEnvironmentFilter
            value={environment}
            options={environmentOptions}
            onChange={(value) => updateFilter(setEnvironment, value)}
          />

          <LogTimeRangeFilter
            value={timeRange}
            start={customStart}
            end={customEnd}
            onChange={handleTimeRangeChange}
            onStartChange={handleCustomStartChange}
            onEndChange={handleCustomEndChange}
            onApply={handleApplyCustomRange}
          />

          <LogSortFilter
            value={sortOrder}
            onChange={(value) => updateFilter(setSortOrder, value)}
          />
        </LogFilters>
      </div>

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

      {isFetching && !isFetchingNextPage && (
        <span className="text-xs text-muted-foreground">Updating...</span>
      )}

      {logs.length === 0 ? (
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
          <div className="min-w-0">
            <LogList
              logs={logs}
              selectedLogId={selectedLog?.id ?? null}
              onSelect={(log) => setSelectedLogId(log.id)}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={handleLoadMore}
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
