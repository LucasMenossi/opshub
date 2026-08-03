import type { FilterFn } from "@tanstack/react-table";

export function createGlobalFilter<T>(
  getSearchableValues: (row: T) => Array<string | null | undefined>,
): FilterFn<T> {
  return (row, _columnId, filterValue) => {
    const search = String(filterValue).trim().toLowerCase();

    if (!search) {
      return true;
    }

    return getSearchableValues(row.original)
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(search));
  };
}
