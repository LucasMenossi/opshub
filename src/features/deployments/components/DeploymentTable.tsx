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

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui";
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
  const { data = [], isPending, isError } = useDeployments();

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
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading deployments...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Failed to load deployments.</p>
      </Card>
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
