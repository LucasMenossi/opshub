import { Select } from "@/components/UI";
import { createStaticFilterOptions } from "@/lib/table";
import { formatLogSeverity } from "@/lib/formatters";

import type { LogSeverity } from "../../api";
import { LOG_SEVERITIES } from "../../constants";

interface LogSeverityFilterProps {
  value: LogSeverity | "";
  onChange: (value: LogSeverity | "") => void;
}

const severityOptions = createStaticFilterOptions(
  LOG_SEVERITIES,
  formatLogSeverity,
);

export function LogSeverityFilter({ value, onChange }: LogSeverityFilterProps) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value as LogSeverity | "")}
    >
      <option value="">All Levels</option>

      {severityOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
