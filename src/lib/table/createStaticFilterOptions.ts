import type { FilterOption } from "../types";

export function createStaticFilterOptions<T extends string>(
  values: readonly T[],
  getLabel: (value: T) => string = (value) => value,
): FilterOption[] {
  return values.map((value) => ({
    value,
    label: getLabel(value),
  }));
}
