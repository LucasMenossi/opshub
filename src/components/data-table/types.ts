import type { FilterOption } from "@/lib/types/filter-option";

export interface DataTableFilter {
  columnId: string;
  label: string;
  options: FilterOption[];
}
