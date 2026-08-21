import type { FilterOption } from "@/lib/types/filterOption";

export interface DataTableFilter {
  columnId: string;
  label: string;
  options: FilterOption[];
}
