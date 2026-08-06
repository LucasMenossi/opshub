import { useState } from "react";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import { createGlobalFilter, useDataTable } from "@/lib/table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/data-table";
import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import { useServices } from "../hooks";
import { serviceColumns } from "./service-columns";
import { serviceTableFilters } from "./service-table-filters";

export function ServiceTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useServices();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useDataTable({
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
