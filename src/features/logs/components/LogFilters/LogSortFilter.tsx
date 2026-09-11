import { Select } from "@/components/UI";

import type { LogSortOrder } from "../../constants";

interface LogSortFilterProps {
  value: LogSortOrder;
  onChange: (value: LogSortOrder) => void;
}

export function LogSortFilter({ value, onChange }: LogSortFilterProps) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value as LogSortOrder)}
    >
      <option value="desc">Newest first</option>
      <option value="asc">Oldest first</option>
    </Select>
  );
}
