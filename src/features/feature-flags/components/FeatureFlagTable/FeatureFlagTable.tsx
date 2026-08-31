import { useState } from "react";

import {
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@/components/DataTable";
import { createGlobalFilter, useDataTable } from "@/lib/table";

import { useFeatureFlags } from "../../hooks";
import { featureFlagColumns } from "./featureFlagColumns";
import { getFeatureFlagTableFilters } from "./featureFlagTableFilters";

export function FeatureFlagTable() {
  const {
    data = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useFeatureFlags();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
      featureFlag.ownerId,
    ]),

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
        title="Failed to load feature flags"
        description="The feature flag data could not be retrieved."
        isRetrying={isFetching}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage="No feature flags found."
      searchPlaceholder="Search feature flags..."
      filters={getFeatureFlagTableFilters(data)}
    />
  );
}
