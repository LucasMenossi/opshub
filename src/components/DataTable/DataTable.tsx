import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { flexRender, type Table } from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { DataTableFilter } from "./types";
import { Pagination } from "../Pagination";
import { DataTableToolbar } from "./DataTableToolbar";

interface DataTableProps<TData> {
  table: Table<TData>;
  emptyMessage?: string;
  searchPlaceholder?: string;
  filters?: DataTableFilter[];

  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onClearFilters?: () => void;

  toolbar?: ReactNode;
}

export function DataTable<TData>({
  table,
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
  filters = [],
  searchValue,
  onSearchChange,
  toolbar,
  onClearFilters,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const filteredRows = table.getFilteredRowModel().rows;
  const pagination = table.getState().pagination;
  const hasData = table.getCoreRowModel().rows.length > 0;

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        toolbar={toolbar}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />

      <div className="overflow-x-auto rounded-lg border py-1">
        <table className="w-full min-w-175">
          <thead className="border-b bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorting = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-2 transition-colors hover:text-foreground"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {sorting === "asc" ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : sorting === "desc" ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4" />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  className="px-6 py-12"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">
                      {hasData
                        ? "No results match your filters."
                        : emptyMessage}
                    </p>

                    {hasData && onClearFilters && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="mt-4 inline-flex h-10 items-center rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        totalPages={Math.max(table.getPageCount(), 1)}
        totalResults={filteredRows.length}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onPageSizeChange={table.setPageSize}
      />
    </div>
  );
}
