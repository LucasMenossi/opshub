import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { PanelRightClose, PanelRightOpen } from "lucide-react";

import { DataTableError, DataTableSkeleton } from "@/components/DataTable";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useServices } from "@/features/services";
import { cn } from "@/lib/utils";

import { LOG_ENVIRONMENTS, type LogTimeRange } from "../constants";
import { useLogs } from "../hooks";
import { getSelectedLog } from "../utils";

import { LogDetails } from "./LogDetails";
import {
  LogEnvironmentFilter,
  LogFilters,
  LogSearch,
  LogServiceFilter,
  LogSeverityFilter,
  LogSortFilter,
  LogTimeRangeFilter,
} from "./LogFilters";
import { LogList } from "./LogList";

const SEARCH_DEBOUNCE_DELAY = 300;

export function LogExplorer() {
  const search = useSearch({
    from: "/_authenticated/logs/",
  });

  const navigate = useNavigate({
    from: "/logs",
  });

  const [query, setQuery] = useState(search.search ?? "");
  const [customStart, setCustomStart] = useState(search.customStart ?? "");
  const [customEnd, setCustomEnd] = useState(search.customEnd ?? "");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(true);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_DELAY);

  const timeRange = search.timeRange ?? "";
  const severity = search.severity ?? "";
  const service = search.service ?? "";
  const environment = search.environment ?? "";
  const sortOrder = search.sortOrder ?? "desc";

  useEffect(() => {
    const currentSearch = search.search ?? "";

    if (debouncedQuery === currentSearch) {
      return;
    }

    void navigate({
      search: {
        ...search,
        search: debouncedQuery || undefined,
      },
      replace: true,
    });
  }, [debouncedQuery, navigate, search]);

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
    search: search.search || undefined,
    severity: severity || undefined,
    service: service || undefined,
    environment: environment || undefined,
    sortOrder,
    timeRange,
    customStart: search.customStart ?? "",
    customEnd: search.customEnd ?? "",
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

  const selectedLog = useMemo(
    () => getSelectedLog(logs, selectedLogId),
    [logs, selectedLogId],
  );

  const updateSearch = (values: Partial<typeof search>) => {
    void navigate({
      search: {
        ...search,
        ...values,
      },
      replace: true,
    });

    setSelectedLogId(null);
  };

  const handleTimeRangeChange = (value: LogTimeRange) => {
    if (value === "custom") {
      updateSearch({
        timeRange: "custom",
      });
      return;
    }

    updateSearch({
      timeRange: value || undefined,
      customStart: undefined,
      customEnd: undefined,
    });

    setCustomStart("");
    setCustomEnd("");
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
    updateSearch({
      timeRange: "custom",
      customStart: customStart || undefined,
      customEnd: customEnd || undefined,
    });
  };

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleClearFilters = () => {
    setQuery("");
    setCustomStart("");
    setCustomEnd("");
    setSelectedLogId(null);

    void navigate({
      search: {},
      replace: true,
    });
  };

  if (isLoading && !data) {
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
      <div className="space-y-2">
        <LogFilters>
          <div className="w-full lg:w-auto">
            <LogSearch
              value={query}
              onChange={(value) => {
                setQuery(value);
                setSelectedLogId(null);
              }}
            />
          </div>

          <LogSeverityFilter
            value={severity}
            onChange={(value) =>
              updateSearch({
                severity: value || undefined,
              })
            }
          />

          <LogServiceFilter
            value={service}
            options={serviceOptions}
            onChange={(value) =>
              updateSearch({
                service: value || undefined,
              })
            }
          />

          <LogEnvironmentFilter
            value={environment}
            options={LOG_ENVIRONMENTS}
            onChange={(value) =>
              updateSearch({
                environment: value || undefined,
              })
            }
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
            onChange={(value) =>
              updateSearch({
                sortOrder: value === "desc" ? undefined : value,
              })
            }
          />
        </LogFilters>
        <div className="h-4">
          {isFetching && !isFetchingNextPage && (
            <span className="text-xs text-muted-foreground">Updating...</span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDetailsOpen((previous) => !previous)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted cursor-pointer"
      >
        {detailsOpen ? (
          <PanelRightClose className="h-4 w-4" />
        ) : (
          <PanelRightOpen className="h-4 w-4" />
        )}

        {detailsOpen ? "Hide Details" : "Show Details"}
      </button>

      {logs.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-sm font-medium">No logs found.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query.
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 inline-flex h-10 items-center rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted cursor-pointer"
          >
            Clear filters
          </button>
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
