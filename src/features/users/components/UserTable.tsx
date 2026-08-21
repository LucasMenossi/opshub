import { useEffect, useState } from "react";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";
import { formatUserRole, formatUserStatus } from "@/lib/formatters";
import { createGlobalFilter, useDataTable } from "@/lib/table";

import { useUsers } from "../hooks";
import { getUserTableFilters } from "./userTableFilters";
import { userColumns } from "./userColumns";

interface UserTableProps {
  onSummaryChange?: (summary: { users: number; teams: number }) => void;
}

export function UserTable({ onSummaryChange }: UserTableProps) {
  const { data = [], isPending, isError, refetch, isFetching } = useUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useDataTable({
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

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    onSummaryChange?.({
      users: data.length,
      teams: new Set(data.map((user) => user.team)).size,
    });
  }, [data, onSummaryChange]);

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
