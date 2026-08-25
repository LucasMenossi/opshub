import { useState } from "react";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";
import {
  formatDateTime,
  formatDeploymentStatus,
  formatEnvironment,
} from "@/lib/formatters";

import { useDeployments } from "../../hooks";
import { deploymentColumns } from "./deploymentColumns";
import { deploymentTableFilters } from "./deploymentTableFilters";
import { createGlobalFilter, useDataTable } from "@/lib/table";

export function DeploymentTable() {
  const {
    data = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useDeployments();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useDataTable({
    data,
    columns: deploymentColumns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    globalFilterFn: createGlobalFilter((deployment) => [
      deployment.service,
      deployment.version,
      deployment.author,
      formatEnvironment(deployment.environment),
      formatDeploymentStatus(deployment.status),
      formatDateTime(deployment.deployedAt),
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
      emptyMessage="No deployments found."
      searchPlaceholder="Search deployments..."
      filters={deploymentTableFilters}
    />
  );
}
