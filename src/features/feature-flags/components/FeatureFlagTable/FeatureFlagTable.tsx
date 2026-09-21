import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/DataTable";
import { createGlobalFilter, useDataTable } from "@/lib/table";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/UI";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUsers } from "@/features/users";

import { useFeatureFlags } from "../../hooks";
import type { FeatureFlagTableRow } from "../../types";
import { featureFlagColumns } from "./featureFlagColumns";
import { getFeatureFlagFilterOptions } from "./featureFlagTableFilters";
import { getFilterValue } from "@/utils";

const SEARCH_DEBOUNCE_DELAY = 300;

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
    from: "/_authenticated/feature-flags/",
  });

  const navigate = useNavigate({
    from: "/feature-flags",
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
  });

  const isPending = isFeatureFlagsPending || isUsersPending;

  const isError = isFeatureFlagsError || isUsersError;

  const filterOptions = useMemo(
    () => getFeatureFlagFilterOptions(data),
    [data],
  );

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
    <div className="space-y-4">
      <DataTableToolbar>
        <SearchInput
          className="w-full max-w-sm"
          value={query}
          onChange={setQuery}
          placeholder="Search feature flags..."
        />

        <Select
          value={search.enabled === undefined ? "" : String(search.enabled)}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                enabled:
                  value === "true"
                    ? true
                    : value === "false"
                      ? false
                      : undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Statuses</option>
          {filterOptions.enabled.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={search.owner ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            void navigate({
              search: {
                ...search,
                owner: value || undefined,
              },
              replace: true,
            });
          }}
        >
          <option value="">All Owners</option>
          {filterOptions.owner.map((option) => (
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
            ? "No feature flags match the current filters."
            : "No feature flags found."
        }
        onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
      />
    </div>
  );
}
