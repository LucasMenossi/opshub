import { LogLevelBadge } from "@/components/badges";
import { formatEnvironment } from "@/lib/formatters";
import { cn } from "@/lib/utils";

import type { LogEntry } from "../api";
import { formatRelativeTime } from "@/lib/formatters/date";

interface LogItemProps {
  log: LogEntry;
  selected: boolean;
  onSelect: (log: LogEntry) => void;
}

export function LogItem({ log, selected, onSelect }: LogItemProps) {
  return (
    <li className="border-b last:border-b-0">
      <button
        type="button"
        onClick={() => onSelect(log)}
        className={cn(
          "flex w-full items-start justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50",
          "cursor-pointer",
          selected && "bg-primary/5",
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <time
              dateTime={log.timestamp}
              className="text-sm text-muted-foreground"
            >
              {formatRelativeTime(log.timestamp)}
            </time>

            <span className="text-sm text-muted-foreground">
              {log.service}
              {" · "}
              {formatEnvironment(log.environment)}
            </span>
          </div>

          <p className="mt-1 font-mono text-sm">{log.message}</p>
        </div>

        <LogLevelBadge severity={log.severity} />
      </button>
    </li>
  );
}
