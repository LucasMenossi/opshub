import { useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/data-table";
import {
  formatDateTime,
  formatDeploymentStatus,
  formatEnvironment,
} from "@/lib/formatters";

import { useDeployments } from "../hooks";
import { deploymentColumns } from "./deployment-columns";
import { deploymentTableFilters } from "./deployment-table-filters";
import { createGlobalFilter } from "@/lib/table";

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

  const table = useReactTable({
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

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

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
