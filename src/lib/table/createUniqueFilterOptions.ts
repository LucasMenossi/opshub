import type { FilterOption } from "../types";

export function createUniqueFilterOptions<T>(
  items: readonly T[],
  getValue: (item: T) => string,
  getLabel: (value: string) => string = (value) => value,
): FilterOption[] {
  return [...new Set(items.map(getValue))].sort().map((value) => ({
    value,
    label: getLabel(value),
  }));
}
