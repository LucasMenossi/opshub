import { useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui";
import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import { useServices } from "../hooks";
import { serviceColumns } from "./service-columns";
import { serviceTableFilters } from "./service-table-filters";
import { createGlobalFilter } from "@/lib/table";

export function ServiceTable() {
  const { data = [], isPending, isError } = useServices();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: serviceColumns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    globalFilterFn: createGlobalFilter((service) => [
      service.name,
      service.owner,
      service.version,
      formatEnvironment(service.environment),
      formatServiceStatus(service.status),
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
      filters={serviceTableFilters}
    />
  );
}
