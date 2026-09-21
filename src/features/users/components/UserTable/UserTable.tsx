import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/DataTable";

import { formatUserRole, formatUserStatus } from "@/lib/formatters";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/UI";
import { createGlobalFilter, useDataTable } from "@/lib/table";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { useUsers } from "../../hooks";
import { getUserFilterOptions } from "./userTableFilters";
import { userColumns } from "./userColumns";
import { getFilterValue } from "@/utils";

interface UserTableProps {
  onSummaryChange?: (summary: { users: number; teams: number }) => void;
}

const SEARCH_DEBOUNCE_DELAY = 300;

export function UserTable({ onSummaryChange }: UserTableProps) {
  const { data = [], isPending, isError, refetch, isFetching } = useUsers();

  const search = useSearch({
    from: "/_authenticated/users/",
  });

  const navigate = useNavigate({
    from: "/users",
  });

  const sorting = useMemo<SortingState>(
    () =>
      search.sortBy
        ? [
            {
              id: search.sortBy,
              desc: search.sortOrder === "desc",
            },
          ]
        : [],
    [search.sortBy, search.sortOrder],
  );

  const [query, setQuery] = useState(search.q ?? "");

  const filterOptions = useMemo(() => getUserFilterOptions(data), [data]);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    const currentQuery = search.q ?? "";

    if (debouncedQuery === currentQuery) {
      return;
    }

    void navigate({
      search: {
        ...search,
        q: debouncedQuery || undefined,
      },
      replace: true,
    });
  }, [debouncedQuery, navigate, search]);

  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      ...(search.role
        ? [
            {
              id: "role",
              value: search.role,
            },
          ]
        : []),

      ...(search.team
        ? [
            {
              id: "team",
              value: search.team,
            },
          ]
        : []),

      ...(search.status
        ? [
            {
              id: "status",
              value: search.status,
            },
          ]
        : []),
    ],
    [search.role, search.team, search.status],
  );

  const hasActiveFilters =
    Boolean(search.q) ||
    Boolean(search.role) ||
    Boolean(search.team) ||
    Boolean(search.status);

  const handleClearFilters = () => {
    setQuery("");

    void navigate({
      search: {},
      replace: true,
    });
  };

  const table = useDataTable({
    data,
    columns: userColumns,

    state: {
      sorting,
      globalFilter: search.q ?? "",
      columnFilters,
    },

    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;

      const nextSort = nextSorting[0];

      void navigate({
        search: {
          ...search,
          sortBy: nextSort?.id,
          sortOrder: nextSort ? (nextSort.desc ? "desc" : "asc") : undefined,
        },
        replace: true,
      });
    },

    onGlobalFilterChange: (updater) => {
      const currentValue = query;

      const nextValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      setQuery(nextValue);
    },

    onColumnFiltersChange: (updater) => {
      const nextFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      const roleValue = getFilterValue(nextFilters, "role");

      const teamValue = getFilterValue(nextFilters, "team");

      const statusValue = getFilterValue(nextFilters, "status");

      void navigate({
        search: {
          ...search,

          role: typeof roleValue === "string" ? roleValue : undefined,

          team: typeof teamValue === "string" ? teamValue : undefined,

          status: typeof statusValue === "string" ? statusValue : undefined,
        },

        replace: true,
      });
    },

    globalFilterFn: createGlobalFilter((user) => [
      user.name,
      user.email,
      user.team,
      formatUserRole(user.role),
      formatUserStatus(user.status),
    ]),
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
    <div className="space-y-4">
      <DataTableToolbar>
        <SearchInput
          className="w-full max-w-sm"
          value={query}
          onChange={setQuery}
          placeholder="Search users..."
        />

        <Select
          value={search.role ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                role: value || undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Roles</option>
          {filterOptions.role.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={search.team ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                team: value || undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Teams</option>
          {filterOptions.team.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={search.status ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                status: value || undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Statuses</option>
          {filterOptions.status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </DataTableToolbar>

      <DataTable
        table={table}
        emptyMessage={
          hasActiveFilters
            ? "No users match the current filters."
            : "No users found."
        }
        onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
      />
    </div>
  );
}
