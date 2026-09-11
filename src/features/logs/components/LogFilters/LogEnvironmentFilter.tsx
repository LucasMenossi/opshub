import { Select } from "@/components/UI";
import type { Environment } from "@/features/services";
import type { FilterOption } from "@/lib/types";

interface LogEnvironmentFilterProps {
  value: Environment | "";
  options: FilterOption[];
  onChange: (value: Environment | "") => void;
}

export function LogEnvironmentFilter({
  value,
  options,
  onChange,
}: LogEnvironmentFilterProps) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value as Environment | "")}
    >
      <option value="">All Environments</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
