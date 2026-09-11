import { Select } from "@/components/UI";
import type { FilterOption } from "@/lib/types";

interface LogServiceFilterProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function LogServiceFilter({
  value,
  options,
  onChange,
}: LogServiceFilterProps) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">All Services</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
