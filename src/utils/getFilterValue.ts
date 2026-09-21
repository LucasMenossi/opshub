import type { ColumnFiltersState } from "@tanstack/react-table";

export function getFilterValue(
  filters: ColumnFiltersState,
  id: string,
): unknown {
  return filters.find((filter) => filter.id === id)?.value;
}
