interface IncidentDateRangeFilterProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function IncidentDateRangeFilter({
  from,
  to,
  onFromChange,
  onToChange,
}: IncidentDateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={from}
        max={to || undefined}
        onChange={(event) => onFromChange(event.target.value)}
        aria-label="Created from"
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
      />

      <span className="text-sm text-muted-foreground">to</span>

      <input
        type="date"
        value={to}
        min={from || undefined}
        onChange={(event) => onToChange(event.target.value)}
        aria-label="Created to"
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
