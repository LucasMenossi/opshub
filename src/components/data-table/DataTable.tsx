import { flexRender, type Table } from "@tanstack/react-table";

interface DataTableProps<TData> {
  table: Table<TData>;
  emptyMessage?: string;
}

export function DataTable<TData>({
  table,
  emptyMessage = "No results found.",
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const isEmpty = table.getCoreRowModel().rows.length === 0;

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={table.getVisibleLeafColumns().length}
                className="px-6 py-12 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
