import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";

import { createGlobalFilter, useDataTable } from "@/lib/table";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import type { Environment, ServiceStatus } from "../../api";

import { useServices } from "../../hooks";

import { serviceColumns } from "./serviceColumns";
import { serviceTableFilters } from "./serviceTableFilters";

const SEARCH_DEBOUNCE_DELAY = 300;

function getFilterValue(filters: ColumnFiltersState, id: string): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}

function isServiceStatus(value: unknown): value is ServiceStatus {
  return value === "healthy" || value === "degraded" || value === "down";
}

function isEnvironment(value: unknown): value is Environment {
  return value === "production" || value === "staging";
}

export function ServiceTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useServices();

  const search = useSearch({
    from: "/services/",
  });

  const navigate = useNavigate({
    from: "/services/",
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

  const hasActiveFilters =
    Boolean(search.q) || Boolean(search.status) || Boolean(search.environment);

  const handleClearFilters = () => {
    setQuery("");

    void navigate({
      search: {},
      replace: true,
    });
  };

  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      ...(search.status
        ? [
            {
              id: "status",
              value: search.status,
            },
          ]
        : []),
      ...(search.environment
        ? [
            {
              id: "environment",
              value: search.environment,
            },
          ]
        : []),
    ],
    [search.status, search.environment],
  );

  const table = useDataTable({
    data,
    columns: serviceColumns,

    state: {
      sorting,
      globalFilter: search.q ?? "",
      columnFilters,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: (updater) => {
      const value = typeof updater === "function" ? updater(query) : updater;

      setQuery(value);
    },

    onColumnFiltersChange: (updater) => {
      const nextFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      const statusValue = getFilterValue(nextFilters, "status");

      const environmentValue = getFilterValue(nextFilters, "environment");

      void navigate({
        search: {
          ...search,
          status: isServiceStatus(statusValue) ? statusValue : undefined,
          environment: isEnvironment(environmentValue)
            ? environmentValue
            : undefined,
        },
        replace: true,
      });
    },

    globalFilterFn: createGlobalFilter((service) => [
      service.name,
      service.owner,
      service.version,
      formatEnvironment(service.environment),
      formatServiceStatus(service.status),
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
        title="Failed to load services"
        description="The service data could not be retrieved."
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
          ? "No services match the current filters."
          : "No services found."
      }
      searchPlaceholder="Search services..."
      filters={serviceTableFilters}
      searchValue={query}
      onSearchChange={setQuery}
      onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
    />
  );
}
