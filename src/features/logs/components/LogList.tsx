import type { LogEntry } from "../api";

import { LogItem } from "./LogItem";

interface LogListProps {
  logs: LogEntry[];
}

export function LogList({ logs }: LogListProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <ul className="divide-y">
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </ul>
    </div>
  );
}
