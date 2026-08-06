import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { flexRender, type Table } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { SearchInput } from "../search-input";

export interface DataTableFilter {
  columnId: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface DataTableProps<TData> {
  table: Table<TData>;
  emptyMessage?: string;
  searchPlaceholder?: string;
  filters?: DataTableFilter[];
  toolbar?: ReactNode;
}

export function DataTable<TData>({
  table,
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
  filters = [],
  toolbar,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const hasData = table.getCoreRowModel().rows.length > 0;

  return (
    <div className="space-y-4">
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
            <select
              key={filter.columnId}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                column.setFilterValue(event.target.value || undefined)
              }
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
            >
              <option value="">All {filter.label}</option>

              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        })}

        {toolbar}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
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
                  className="px-6 py-12 text-center text-sm text-muted-foreground"
                >
                  {hasData ? "No results match your filters." : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} result
          {table.getFilteredRowModel().rows.length === 1 ? "" : "s"}
        </p>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Rows per page
            <select
              value={table.getState().pagination.pageSize}
              onChange={(event) => {
                table.setPageSize(Number(event.target.value));
              }}
              className="h-9 rounded-lg border bg-background px-2 text-sm text-foreground outline-none"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </label>

          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
