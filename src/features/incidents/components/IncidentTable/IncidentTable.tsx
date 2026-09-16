import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import type { IncidentSeverity, IncidentStatus } from "../../api";

import { useIncidents } from "../../hooks";

import { incidentColumns } from "./incidentColumns";
import { IncidentDateRangeFilter } from "../IncidentDateRangeFilter";
import { getIncidentTableFilters } from "./incidentTableFilters";

import { createGlobalFilter, useDataTable } from "@/lib/table";

const SEARCH_DEBOUNCE_DELAY = 300;

function getFilterValue(filters: ColumnFiltersState, id: string): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}

function isIncidentSeverity(value: unknown): value is IncidentSeverity {
  return (
    value === "low" ||
    value === "medium" ||
    value === "high" ||
    value === "critical"
  );
}

function isIncidentStatus(value: unknown): value is IncidentStatus {
  return value === "open" || value === "investigating" || value === "resolved";
}

export function IncidentTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useIncidents();

  const search = useSearch({
    from: "/incidents",
  });

  const navigate = useNavigate({
    from: "/incidents",
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [query, setQuery] = useState(search.q ?? "");

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    const currentQuery = search.q ?? "";

    if (debouncedQuery === currentQuery) {
      return;
    }

    void navigate({
      search: {
        ...search,
        q: debouncedQuery || undefined,
      },
      replace: true,
    });
  }, [debouncedQuery, navigate, search]);

  const filters = useMemo(() => getIncidentTableFilters(data), [data]);

  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      ...(search.severity
        ? [
            {
              id: "severity",
              value: search.severity,
            },
          ]
        : []),

      ...(search.status
        ? [
            {
              id: "status",
              value: search.status,
            },
          ]
        : []),

      ...(search.service
        ? [
            {
              id: "service",
              value: search.service,
            },
          ]
        : []),

      ...(search.owner
        ? [
            {
              id: "owner",
              value: search.owner,
            },
          ]
        : []),

      ...(search.from || search.to
        ? [
            {
              id: "createdAt",
              value: {
                from: search.from,
                to: search.to,
              },
            },
          ]
        : []),
    ],
    [
      search.severity,
      search.status,
      search.service,
      search.owner,
      search.from,
      search.to,
    ],
  );

  const hasActiveFilters =
    Boolean(search.q) ||
    Boolean(search.severity) ||
    Boolean(search.status) ||
    Boolean(search.service) ||
    Boolean(search.owner) ||
    Boolean(search.from) ||
    Boolean(search.to);

  const handleClearFilters = () => {
    setQuery("");

    void navigate({
      search: {},
      replace: true,
    });
  };

  const table = useDataTable({
    data,
    columns: incidentColumns,

    state: {
      sorting,
      globalFilter: search.q ?? "",
      columnFilters,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: (updater) => {
      const currentValue = query;

      const nextValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      setQuery(nextValue);
    },

    onColumnFiltersChange: (updater) => {
      const nextFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      const severityValue = getFilterValue(nextFilters, "severity");

      const statusValue = getFilterValue(nextFilters, "status");

      const serviceValue = getFilterValue(nextFilters, "service");

      const ownerValue = getFilterValue(nextFilters, "owner");

      void navigate({
        search: {
          ...search,

          severity: isIncidentSeverity(severityValue)
            ? severityValue
            : undefined,

          status: isIncidentStatus(statusValue) ? statusValue : undefined,

          service: typeof serviceValue === "string" ? serviceValue : undefined,

          owner: typeof ownerValue === "string" ? ownerValue : undefined,
        },

        replace: true,
      });
    },

    globalFilterFn: createGlobalFilter((incident) => [
      incident.title,
      incident.service,
      incident.owner,
    ]),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  if (isPending) {
    return <DataTableSkeleton columns={7} />;
  }

  if (isError) {
    return (
      <DataTableError
        title="Failed to load incidents"
        description="The incident data could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage={
        hasActiveFilters
          ? "No incidents match the current filters."
          : "No incidents found."
      }
      searchPlaceholder="Search incidents..."
      filters={filters}
      searchValue={query}
      onSearchChange={setQuery}
      onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
      toolbar={
        <IncidentDateRangeFilter
          key={`${search.from ?? ""}-${search.to ?? ""}`}
          from={search.from ?? ""}
          to={search.to ?? ""}
          onFromChange={(from) => {
            void navigate({
              search: {
                ...search,
                from: from || undefined,
              },
              replace: true,
            });
          }}
          onToChange={(to) => {
            void navigate({
              search: {
                ...search,
                to: to || undefined,
              },
              replace: true,
            });
          }}
        />
      }
    />
  );
}
