import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { SearchInput } from "../search-input";
import { Select } from "../ui";

import type { DataTableFilter } from "./types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder: string;
  filters: DataTableFilter[];
  toolbar?: ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  filters,
  toolbar,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        className="w-full max-w-sm"
        value={table.getState().globalFilter ?? ""}
        onChange={table.setGlobalFilter}
        placeholder={searchPlaceholder}
      />

      {filters.map((filter) => {
        const column = table.getColumn(filter.columnId);

        if (!column) {
          return null;
        }

        return (
          <Select
            key={filter.columnId}
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              column.setFilterValue(event.target.value || undefined)
            }
          >
            <option value="">All {filter.label}</option>

            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      })}

      {toolbar}
    </div>
  );
}
