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

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/data-table";
import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import { useServices } from "../hooks";
import { serviceColumns } from "./service-columns";
import { serviceTableFilters } from "./service-table-filters";
import { createGlobalFilter } from "@/lib/table";

export function ServiceTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useServices();

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
      emptyMessage="No services found."
      searchPlaceholder="Search services..."
      filters={serviceTableFilters}
    />
  );
}
