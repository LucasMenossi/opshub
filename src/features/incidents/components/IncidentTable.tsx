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

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui";
import {
  formatDateTime,
  formatIncidentSeverity,
  formatIncidentStatus,
} from "@/lib/formatters";

import { useIncidents } from "../hooks";
import { incidentColumns } from "./incident-columns";
import { incidentTableFilters } from "./incident-table-filters";

export function IncidentTable() {
  const { data = [], isPending, isError } = useIncidents();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: incidentColumns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).trim().toLowerCase();

      if (!search) {
        return true;
      }

      const incident = row.original;

      const searchableValues = [
        incident.title,
        formatIncidentSeverity(incident.severity),
        formatIncidentStatus(incident.status),
        incident.owner,
        incident.service,
        formatDateTime(incident.createdAt),
        formatDateTime(incident.updatedAt),
      ];

      return searchableValues.some((value) =>
        value.toLowerCase().includes(search),
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
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading incidents...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Failed to load incidents.</p>
      </Card>
    );
  }

  return (
    <DataTable
      table={table}
      emptyMessage="No incidents found."
      searchPlaceholder="Search incidents..."
      filters={incidentTableFilters}
    />
  );
}
