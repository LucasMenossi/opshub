import { SearchInput } from "@/components/search-input";
import { Select } from "@/components/ui";

import type { Environment } from "@/features/services";
import type { FilterOption } from "@/lib/types";
import { createStaticFilterOptions } from "@/lib/table";
import { formatLogSeverity } from "@/lib/formatters";

import type { LogSeverity } from "../api";
import {
  LOG_SEVERITIES,
  LOG_TIME_RANGES,
  type LogSortOrder,
  type LogTimeRange,
} from "../constants";

interface LogFiltersProps {
  query: string;
  severity: LogSeverity | "";
  service: string;
  environment: Environment | "";

  serviceOptions: FilterOption[];
  environmentOptions: FilterOption[];

  timeRange: LogTimeRange;
  customStart: string;
  customEnd: string;

  sortOrder: LogSortOrder;

  onQueryChange: (value: string) => void;
  onSeverityChange: (value: LogSeverity | "") => void;
  onServiceChange: (value: string) => void;
  onEnvironmentChange: (value: Environment | "") => void;
  onTimeRangeChange: (value: LogTimeRange) => void;
  onCustomStartChange: (value: string) => void;
  onCustomEndChange: (value: string) => void;
  onSortOrderChange: (value: LogSortOrder) => void;
}

export function LogFilters({
  query,
  severity,
  service,
  environment,
  serviceOptions,
  environmentOptions,
  timeRange,
  customStart,
  customEnd,
  sortOrder,
  onQueryChange,
  onSeverityChange,
  onServiceChange,
  onEnvironmentChange,
  onTimeRangeChange,
  onCustomStartChange,
  onCustomEndChange,
  onSortOrderChange,
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
        value={timeRange}
        onChange={(event) =>
          onTimeRangeChange(event.target.value as LogTimeRange)
        }
      >
        {LOG_TIME_RANGES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {timeRange === "custom" && (
        <>
          <div className="flex items-center gap-2">
            <label
              htmlFor="log-range-start"
              className="text-sm text-muted-foreground"
            >
              From
            </label>

            <input
              id="log-range-start"
              type="datetime-local"
              value={customStart}
              onChange={(event) => onCustomStartChange(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="log-range-end"
              className="text-sm text-muted-foreground"
            >
              To
            </label>

            <input
              id="log-range-end"
              type="datetime-local"
              value={customEnd}
              onChange={(event) => onCustomEndChange(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
        </>
      )}

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
