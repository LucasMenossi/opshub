import { useRef } from "react";

interface IncidentDateRangeFilterProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

function isValidDateValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function IncidentDateRangeFilter({
  from,
  to,
  onFromChange,
  onToChange,
}: IncidentDateRangeFilterProps) {
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  function handleFromChange(value: string) {
    if (value === "" || isValidDateValue(value)) {
      onFromChange(value);
    }
  }

  function handleToChange(value: string) {
    if (value === "" || isValidDateValue(value)) {
      onToChange(value);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fromInputRef}
        type="date"
        defaultValue={from}
        max={to || undefined}
        onChange={(event) => {
          handleFromChange(event.target.value);
        }}
        aria-label="Created from"
        className="
          h-10 rounded-lg
          border border-border
          bg-background text-foreground
          px-3 text-sm
          outline-none transition-colors
          scheme-light
          dark:scheme-dark
          focus:border-foreground
          focus:ring-2 focus:ring-foreground/10
          disabled:cursor-not-allowed disabled:opacity-50
        "
      />

      <span className="text-sm text-muted-foreground">to</span>

      <input
        ref={toInputRef}
        type="date"
        defaultValue={to}
        min={from || undefined}
        onChange={(event) => {
          handleToChange(event.target.value);
        }}
        aria-label="Created to"
        className="
          h-10 rounded-lg
          border border-border
          bg-background text-foreground
          px-3 text-sm
          outline-none transition-colors
          scheme-light
          dark:scheme-dark
          focus:border-foreground
          focus:ring-2 focus:ring-foreground/10
          disabled:cursor-not-allowed disabled:opacity-50
        "
      />
    </div>
  );
}
