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
import { formatUserRole, formatUserStatus } from "@/lib/formatters";
import { createGlobalFilter } from "@/lib/table";

import { useUsers } from "../hooks";
import { userColumns } from "./user-columns";
import { getUserTableFilters } from "./user-table-filters";

export function UserTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: userColumns,

    state: {
      sorting,
      globalFilter,
      columnFilters,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    globalFilterFn: createGlobalFilter((user) => [
      user.name,
      user.email,
      user.team,
      formatUserRole(user.role),
      formatUserStatus(user.status),
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
    return <DataTableSkeleton columns={5} />;
  }

  if (isError) {
    return (
      <DataTableError
        title="Failed to load users"
        description="The user data could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage="No users found."
      searchPlaceholder="Search users..."
      filters={getUserTableFilters(data)}
    />
  );
}
