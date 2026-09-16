import type { ReactNode } from "react";

import type { Table } from "@tanstack/react-table";

import { SearchInput } from "../SearchInput";
import { Select } from "../UI";

import type { DataTableFilter } from "./types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder: string;
  filters: DataTableFilter[];
  toolbar?: ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  filters,
  toolbar,
  searchValue,
  onSearchChange,
}: DataTableToolbarProps<TData>) {
  const isControlledSearch = onSearchChange !== undefined;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        className="w-full max-w-sm"
        value={
          isControlledSearch
            ? (searchValue ?? "")
            : (table.getState().globalFilter ?? "")
        }
        onChange={isControlledSearch ? onSearchChange : table.setGlobalFilter}
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
