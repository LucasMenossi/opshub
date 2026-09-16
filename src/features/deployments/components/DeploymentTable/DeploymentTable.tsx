import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { createGlobalFilter, useDataTable } from "@/lib/table";

import { formatDeploymentStatus, formatEnvironment } from "@/lib/formatters";

import type { DeploymentEnvironment, DeploymentStatus } from "../../api";

import { useDeployments } from "../../hooks";

import { deploymentColumns } from "./deploymentColumns";
import { deploymentTableFilters } from "./deploymentTableFilters";

const SEARCH_DEBOUNCE_DELAY = 300;

function getFilterValue(filters: ColumnFiltersState, id: string): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}

function isDeploymentStatus(value: unknown): value is DeploymentStatus {
  return (
    value === "pending" ||
    value === "running" ||
    value === "successful" ||
    value === "failed" ||
    value === "cancelled"
  );
}

function isDeploymentEnvironment(
  value: unknown,
): value is DeploymentEnvironment {
  return value === "production" || value === "staging";
}

export function DeploymentTable() {
  const {
    data = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useDeployments();

  const search = useSearch({
    from: "/deployments",
  });

  const navigate = useNavigate({
    from: "/deployments",
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

  const hasActiveFilters =
    Boolean(search.q) || Boolean(search.status) || Boolean(search.environment);

  const handleClearFilters = () => {
    setQuery("");

    void navigate({
      search: {},
      replace: true,
    });
  };

  const table = useDataTable({
    data,
    columns: deploymentColumns,

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
          status: isDeploymentStatus(statusValue) ? statusValue : undefined,
          environment: isDeploymentEnvironment(environmentValue)
            ? environmentValue
            : undefined,
        },
        replace: true,
      });
    },

    globalFilterFn: createGlobalFilter((deployment) => [
      deployment.service,
      deployment.version,
      deployment.author,
      formatEnvironment(deployment.environment),
      formatDeploymentStatus(deployment.status),
    ]),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  if (isPending) {
    return <DataTableSkeleton columns={6} />;
  }

  if (isError) {
    return (
      <DataTableError
        title="Failed to load deployments"
        description="The deployment data could not be retrieved."
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
          ? "No deployments match the current filters."
          : "No deployments found."
      }
      searchPlaceholder="Search deployments..."
      filters={deploymentTableFilters}
      searchValue={query}
      onSearchChange={setQuery}
      onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
    />
  );
}
