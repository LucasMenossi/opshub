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

import { useIncidents } from "../hooks";
import { incidentColumns } from "./incident-columns";
import { getIncidentTableFilters } from "./incident-table-filters";
import { IncidentDateRangeFilter } from "./IncidentDataRangeFilter";

export function IncidentTable() {
  const { data = [], isPending, isError } = useIncidents();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filters = getIncidentTableFilters(data);

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

      return [incident.title, incident.service, incident.owner].some((value) =>
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

  function setDateRange(from: string, to: string) {
    setColumnFilters((current) => {
      const filters = current.filter((filter) => filter.id !== "createdAt");

      if (!from && !to) {
        return filters;
      }

      return [
        ...filters,
        {
          id: "createdAt",
          value: {
            from: from || undefined,
            to: to || undefined,
          },
        },
      ];
    });
  }

  function handleDateFromChange(value: string) {
    setDateFrom(value);
    setDateRange(value, dateTo);
  }

  function handleDateToChange(value: string) {
    setDateTo(value);
    setDateRange(dateFrom, value);
  }

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
      filters={filters}
      toolbar={
        <IncidentDateRangeFilter
          from={dateFrom}
          to={dateTo}
          onFromChange={handleDateFromChange}
          onToChange={handleDateToChange}
        />
      }
    />
  );
}
