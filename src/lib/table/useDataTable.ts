import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type TableState,
  type Updater,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type FilterFn,
  useReactTable,
} from "@tanstack/react-table";

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];

  state: {
    sorting: SortingState;
    globalFilter: string;
    columnFilters: ColumnFiltersState;
  };

  onSortingChange: (updater: Updater<SortingState>) => void;
  onGlobalFilterChange: (updater: Updater<string>) => void;
  onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) => void;

  globalFilterFn?: FilterFn<TData>;

  initialState?: Partial<TableState>;
}

export function useDataTable<TData>({
  initialState,
  ...options
}: UseDataTableOptions<TData>) {
  return useReactTable({
    ...options,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      ...initialState,
    },
  });
}
