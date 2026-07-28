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
import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import { useServices } from "../hooks";
import { serviceColumns } from "./service-columns";

export function ServiceTable() {
  const { data = [], isPending, isError } = useServices();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns: serviceColumns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).trim().toLowerCase();

      if (!search) {
        return true;
      }

      const service = row.original;

      const searchableValues = [
        service.name,
        formatServiceStatus(service.status),
        service.version,
        formatEnvironment(service.environment),
        service.owner,
        service.lastDeployment,
        String(service.uptime),
      ];

      return searchableValues.some((value) =>
        value.toLowerCase().includes(search),
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isPending) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading services...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Failed to load services.</p>
      </Card>
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage="No services found."
      searchPlaceholder="Search services..."
    />
  );
}
