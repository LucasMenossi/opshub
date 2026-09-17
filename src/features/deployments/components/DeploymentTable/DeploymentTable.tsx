import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/DataTable";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { createGlobalFilter, useDataTable } from "@/lib/table";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/UI";

import { formatDeploymentStatus, formatEnvironment } from "@/lib/formatters";

import type { DeploymentEnvironment, DeploymentStatus } from "../../api";

import { useDeployments } from "../../hooks";

import { deploymentColumns } from "./deploymentColumns";
import {
  deploymentEnvironmentOptions,
  deploymentStatusOptions,
} from "./deploymentTableFilters";

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
    from: "/_authenticated/deployments/",
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
    <div className="space-y-4">
      <DataTableToolbar>
        <SearchInput
          className="w-full max-w-sm"
          value={query}
          onChange={setQuery}
          placeholder="Search deployments..."
        />

        <Select
          value={search.status ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                status: isDeploymentStatus(value) ? value : undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Statuses</option>
          {deploymentStatusOptions.map((option) => (
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
                environment: isDeploymentEnvironment(value) ? value : undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Environments</option>
          {deploymentEnvironmentOptions.map((option) => (
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
            ? "No deployments match the current filters."
            : "No deployments found."
        }
        onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
      />
    </div>
  );
}
