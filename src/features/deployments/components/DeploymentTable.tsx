import { useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui";

import { useDeployments } from "../hooks";
import { deploymentColumns } from "./deployment-columns";
import { formatDateTime } from "@/lib/formatters";

export function DeploymentTable() {
  const { data = [], isPending, isError } = useDeployments();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns: deploymentColumns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase().trim();

      if (!search) {
        return true;
      }

      const deployment = row.original;

      return [
        deployment.service,
        deployment.version,
        deployment.environment,
        deployment.status,
        deployment.author,
        formatDateTime(deployment.deployedAt),
      ].some((value) => String(value).toLowerCase().includes(search));
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    />
  );
}
