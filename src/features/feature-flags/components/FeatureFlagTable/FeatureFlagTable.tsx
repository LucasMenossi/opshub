import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";
import { createGlobalFilter, useDataTable } from "@/lib/table";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUsers } from "@/features/users";

import { useFeatureFlags } from "../../hooks";
import type { FeatureFlagTableRow } from "../../types";
import { featureFlagColumns } from "./featureFlagColumns";
import { getFeatureFlagTableFilters } from "./featureFlagTableFilters";

const SEARCH_DEBOUNCE_DELAY = 300;

function getFilterValue(filters: ColumnFiltersState, id: string): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}

export function FeatureFlagTable() {
  const {
    data: featureFlags = [],
    isPending: isFeatureFlagsPending,
    isError: isFeatureFlagsError,
    refetch: refetchFeatureFlags,
    isFetching: isFeatureFlagsFetching,
  } = useFeatureFlags();

  const {
    data: users = [],
    isPending: isUsersPending,
    isError: isUsersError,
  } = useUsers();

  const search = useSearch({
    from: "/feature-flags",
  });

  const navigate = useNavigate({
    from: "/feature-flags",
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [query, setQuery] = useState(search.q ?? "");

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

  const data = useMemo<FeatureFlagTableRow[]>(
    () =>
      featureFlags.map((featureFlag) => ({
        ...featureFlag,
        ownerName:
          users.find((user) => user.id === featureFlag.ownerId)?.name ??
          featureFlag.ownerId,
      })),
    [featureFlags, users],
  );

  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      ...(search.enabled !== undefined
        ? [
            {
              id: "enabled",
              value: String(search.enabled),
            },
          ]
        : []),

      ...(search.owner
        ? [
            {
              id: "ownerName",
              value: search.owner,
            },
          ]
        : []),
    ],
    [search.enabled, search.owner],
  );

  const hasActiveFilters =
    Boolean(search.q) || search.enabled !== undefined || Boolean(search.owner);

  const handleClearFilters = () => {
    setQuery("");

    void navigate({
      search: {},
      replace: true,
    });
  };

  const table = useDataTable({
    data,
    columns: featureFlagColumns,

    state: {
      sorting,
      globalFilter: search.q ?? "",
      columnFilters,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: (updater) => {
      const currentValue = query;

      const nextValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      setQuery(nextValue);
    },

    onColumnFiltersChange: (updater) => {
      const nextFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      const enabledValue = getFilterValue(nextFilters, "enabled");

      const ownerValue = getFilterValue(nextFilters, "ownerName");

      void navigate({
        search: {
          ...search,

          enabled:
            enabledValue === "true"
              ? true
              : enabledValue === "false"
                ? false
                : undefined,

          owner: typeof ownerValue === "string" ? ownerValue : undefined,
        },

        replace: true,
      });
    },

    globalFilterFn: createGlobalFilter((featureFlag) => [
      featureFlag.name,
      featureFlag.description,
      featureFlag.ownerName,
    ]),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const isPending = isFeatureFlagsPending || isUsersPending;

  const isError = isFeatureFlagsError || isUsersError;

  if (isPending) {
    return <DataTableSkeleton columns={5} />;
  }

  if (isError) {
    return (
      <DataTableError
        title="Failed to load feature flags"
        description="The feature flags could not be retrieved."
        isRetrying={isFeatureFlagsFetching}
        onRetry={() => void refetchFeatureFlags()}
      />
    );
  }

  return (
    <DataTable
      table={table}
      filters={getFeatureFlagTableFilters(data)}
      searchPlaceholder="Search feature flags..."
      emptyMessage={
        hasActiveFilters
          ? "No feature flags match the current filters."
          : "No feature flags found."
      }
      searchValue={query}
      onSearchChange={setQuery}
      onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
    />
  );
}
