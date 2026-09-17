import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/DataTable";

import { createGlobalFilter, useDataTable } from "@/lib/table";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/UI";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import type { Environment, ServiceStatus } from "../../api";

import { useServices } from "../../hooks";

import { serviceColumns } from "./serviceColumns";
import {
  serviceEnvironmentOptions,
  serviceStatusOptions,
} from "./serviceTableFilters";

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
    from: "/_authenticated/services/",
  });

  const navigate = useNavigate({
    from: "/services",
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
    <div className="space-y-4">
      <DataTableToolbar>
        <SearchInput
          className="w-full max-w-sm"
          value={query}
          onChange={setQuery}
          placeholder="Search services..."
        />

        <Select
          value={search.status ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                status: isServiceStatus(value) ? value : undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Statuses</option>
          {serviceStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={search.environment ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                environment: isEnvironment(value) ? value : undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Environments</option>
          {serviceEnvironmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </DataTableToolbar>

      <DataTable
        table={table}
        emptyMessage={
          hasActiveFilters
            ? "No services match the current filters."
            : "No services found."
        }
        onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
      />
    </div>
  );
}
