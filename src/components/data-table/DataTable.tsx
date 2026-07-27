import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { flexRender, type Table } from "@tanstack/react-table";

interface DataTableProps<TData> {
  table: Table<TData>;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData>({
  table,
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const hasData = table.getCoreRowModel().rows.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
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
                  {hasData ? "No results match your search." : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
