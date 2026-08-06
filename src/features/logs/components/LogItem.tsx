import { formatDateTime, formatEnvironment } from "@/lib/formatters";

import { LogLevelBadge } from "@/components/badges";

import type { LogEntry } from "../api";

interface LogItemProps {
  log: LogEntry;
}

export function LogItem({ log }: LogItemProps) {
  return (
    <li className="border-b px-4 py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <time
            dateTime={log.timestamp}
            className="text-sm text-muted-foreground"
          >
            {formatDateTime(log.timestamp)}
          </time>

          <p className="text-sm text-muted-foreground">
            {log.service}
            {" · "}
            {formatEnvironment(log.environment)}
          </p>

          <p className="font-mono text-sm">{log.message}</p>
        </div>

        <LogLevelBadge severity={log.severity} />
      </div>
    </li>
  );
}
