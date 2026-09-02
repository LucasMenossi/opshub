import { useMemo, useState } from "react";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";
import { createGlobalFilter, useDataTable } from "@/lib/table";
import { useUsers } from "@/features/users";

import { useFeatureFlags } from "../../hooks";
import type { FeatureFlagTableRow } from "../../types";
import { featureFlagColumns } from "./featureFlagColumns";
import { getFeatureFlagTableFilters } from "./featureFlagTableFilters";

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

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  const table = useDataTable({
    data,
    columns: featureFlagColumns,

    state: {
      sorting,
      globalFilter,
      columnFilters,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

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
      emptyMessage="No feature flags found."
    />
  );
}
