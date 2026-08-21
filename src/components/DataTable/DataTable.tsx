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
      />

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
