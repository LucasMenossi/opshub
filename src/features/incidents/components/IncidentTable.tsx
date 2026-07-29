import { useMemo, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable, DataTableSkeleton } from "@/components/data-table";
import { Card } from "@/components/ui";

import type { IncidentSeverity, IncidentStatus } from "../api";
import { useIncidents } from "../hooks";
import { incidentColumns } from "./incident-columns";
import { IncidentDateRangeFilter } from "./IncidentDataRangeFilter";
import { getIncidentTableFilters } from "./incident-table-filters";

function getFilterValue(filters: ColumnFiltersState, id: string): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}

function isIncidentSeverity(value: unknown): value is IncidentSeverity {
  return (
    value === "low" ||
    value === "medium" ||
    value === "high" ||
    value === "critical"
  );
}

function isIncidentStatus(value: unknown): value is IncidentStatus {
  return (
    value === "open" ||
    value === "investigating" ||
    value === "monitoring" ||
    value === "resolved"
  );
}

export function IncidentTable() {
  const { data = [], isPending, isError, refetch, isFetching } = useIncidents();

  const search = useSearch({
    from: "/incidents",
  });

  const navigate = useNavigate({
    from: "/incidents",
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const filters = useMemo(() => getIncidentTableFilters(data), [data]);

  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      ...(search.severity
        ? [
            {
              id: "severity",
              value: search.severity,
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

      ...(search.service
        ? [
            {
              id: "service",
              value: search.service,
            },
          ]
        : []),

      ...(search.owner
        ? [
            {
              id: "owner",
              value: search.owner,
            },
          ]
        : []),

      ...(search.from || search.to
        ? [
            {
              id: "createdAt",
              value: {
                from: search.from,
                to: search.to,
              },
            },
          ]
        : []),
    ],
    [
      search.severity,
      search.status,
      search.service,
      search.owner,
      search.from,
      search.to,
    ],
  );

  const table = useReactTable({
    data,
    columns: incidentColumns,

    state: {
      sorting,
      globalFilter: search.q ?? "",
      columnFilters,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: (updater) => {
      const currentValue = search.q ?? "";

      const nextValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      void navigate({
        search: {
          ...search,
          q: nextValue || undefined,
        },
        replace: true,
      });
    },

    onColumnFiltersChange: (updater) => {
      const nextFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      const severityValue = getFilterValue(nextFilters, "severity");

      const statusValue = getFilterValue(nextFilters, "status");

      const serviceValue = getFilterValue(nextFilters, "service");

      const ownerValue = getFilterValue(nextFilters, "owner");

      void navigate({
        search: {
          ...search,

          severity: isIncidentSeverity(severityValue)
            ? severityValue
            : undefined,

          status: isIncidentStatus(statusValue) ? statusValue : undefined,

          service: typeof serviceValue === "string" ? serviceValue : undefined,

          owner: typeof ownerValue === "string" ? ownerValue : undefined,
        },
        replace: true,
      });
    },

    globalFilterFn: (row, _columnId, filterValue) => {
      const value = String(filterValue).trim().toLowerCase();

      if (!value) {
        return true;
      }

      const incident = row.original;

      return [incident.title, incident.service, incident.owner].some((field) =>
        field.toLowerCase().includes(value),
      );
    },

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
      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Failed to load incidents</p>

            <p className="mt-1 text-sm text-muted-foreground">
              We couldn't retrieve the incident data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="h-9 rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFetching ? "Retrying..." : "Retry"}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage="No incidents found."
      searchPlaceholder="Search incidents..."
      filters={filters}
      toolbar={
        <IncidentDateRangeFilter
          from={search.from ?? ""}
          to={search.to ?? ""}
          onFromChange={(from) => {
            void navigate({
              search: {
                ...search,
                from: from || undefined,
              },
              replace: true,
            });
          }}
          onToChange={(to) => {
            void navigate({
              search: {
                ...search,
                to: to || undefined,
              },
              replace: true,
            });
          }}
        />
      }
    />
  );
}
