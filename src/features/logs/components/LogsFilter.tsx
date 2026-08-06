import type { Environment } from "@/features/services";
import { SearchInput } from "@/components/search-input";

import type { FilterOption } from "@/lib/types";
import type { LogSeverity } from "../api";
import { createStaticFilterOptions } from "@/lib/table";
import { LOG_SEVERITIES } from "../constants";
import { formatLogSeverity } from "@/lib/formatters";

interface LogFiltersProps {
  query: string;
  severity: LogSeverity | "";
  service: string;
  environment: Environment | "";

  serviceOptions: FilterOption[];
  environmentOptions: FilterOption[];

  onQueryChange: (value: string) => void;
  onSeverityChange: (value: LogSeverity | "") => void;
  onServiceChange: (value: string) => void;
  onEnvironmentChange: (value: Environment | "") => void;
}

export function LogFilters({
  query,
  severity,
  service,
  environment,
  serviceOptions,
  environmentOptions,
  onQueryChange,
  onSeverityChange,
  onServiceChange,
  onEnvironmentChange,
}: LogFiltersProps) {
  const severityOptions = createStaticFilterOptions(
    LOG_SEVERITIES,
    formatLogSeverity,
  );

  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search logs..."
        className="max-w-md flex-1"
      />

      <select
        value={severity}
        onChange={(event) =>
          onSeverityChange(event.target.value as LogSeverity | "")
        }
        className="h-10 rounded-lg border bg-background px-3 text-sm"
      >
        <option value="">All Levels</option>

        {severityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={service}
        onChange={(event) => onServiceChange(event.target.value)}
        className="h-10 rounded-lg border bg-background px-3 text-sm"
      >
        <option value="">All Services</option>

        {serviceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={environment}
        onChange={(event) =>
          onEnvironmentChange(event.target.value as Environment | "")
        }
        className="h-10 rounded-lg border bg-background px-3 text-sm"
      >
        <option value="">All Environments</option>

        {environmentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
