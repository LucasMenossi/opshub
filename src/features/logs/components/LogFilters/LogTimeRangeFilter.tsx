import { Select } from "@/components/UI";

import { LOG_TIME_RANGES, type LogTimeRange } from "../../constants";
import { isValidCustomTimeRange } from "../../utils";

interface LogTimeRangeFilterProps {
  value: LogTimeRange;
  start: string;
  end: string;
  onChange: (value: LogTimeRange) => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onApply: () => void;
}

export function LogTimeRangeFilter({
  value,
  start,
  end,
  onChange,
  onStartChange,
  onEndChange,
  onApply,
}: LogTimeRangeFilterProps) {
  const customRangeComplete = Boolean(start && end);

  const customRangeValid =
    customRangeComplete && isValidCustomTimeRange(start, end);

  const showValidationError =
    value === "custom" && customRangeComplete && !customRangeValid;

  const handleApply = () => {
    if (!customRangeValid) {
      return;
    }

    onApply();
  };

  return (
    <>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value as LogTimeRange)}
      >
        {LOG_TIME_RANGES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {value === "custom" && (
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
              value={start}
              onChange={(event) => onStartChange(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground dark:[color-scheme:dark]"
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
              value={end}
              onChange={(event) => onEndChange(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground dark:[color-scheme:dark]"
            />
          </div>

          <button
            type="button"
            onClick={handleApply}
            disabled={!customRangeValid}
            className="h-10 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply
          </button>

          {showValidationError && (
            <p className="basis-full text-sm text-destructive">
              Start date must be before end date.
            </p>
          )}
        </>
      )}
    </>
  );
}
