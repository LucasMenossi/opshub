import type { Environment } from "@/features/services";
import { SearchInput } from "@/components/search-input";

import type { FilterOption } from "@/lib/types";
import type { LogSeverity } from "../api";
import { createStaticFilterOptions } from "@/lib/table";
import { LOG_SEVERITIES, type LogSortOrder } from "../constants";
import { formatLogSeverity } from "@/lib/formatters";
import { Select } from "@/components/ui";

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
  sortOrder: LogSortOrder;
  onSortOrderChange: (value: LogSortOrder) => void;
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
  onSortOrderChange,
  sortOrder,
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

      <Select
        value={severity}
        onChange={(event) =>
          onSeverityChange(event.target.value as LogSeverity | "")
        }
      >
        <option value="">All Levels</option>

        {severityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        value={service}
        onChange={(event) => onServiceChange(event.target.value)}
      >
        <option value="">All Services</option>

        {serviceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        value={environment}
        onChange={(event) =>
          onEnvironmentChange(event.target.value as Environment | "")
        }
      >
        <option value="">All Environments</option>

        {environmentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        value={sortOrder}
        onChange={(event) =>
          onSortOrderChange(event.target.value as LogSortOrder)
        }
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </Select>
    </div>
  );
}
