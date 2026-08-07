import { LogLevelBadge } from "@/components/badges";
import {
  formatDateTime,
  formatEnvironment,
  formatLogSeverity,
} from "@/lib/formatters";

import type { ReactNode } from "react";

import type { LogEntry } from "../api";

interface LogDetailsProps {
  log: LogEntry | null;
}

interface DetailFieldProps {
  label: string;
  children: ReactNode;
}

function DetailField({ label, children }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>

      <dd className="mt-1">{children}</dd>
    </div>
  );
}

export function LogDetails({ log }: LogDetailsProps) {
  if (!log) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Select a log entry to inspect its details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Log Details</h2>

      <dl className="space-y-6">
        <DetailField label="Timestamp">
          {formatDateTime(log.timestamp)}
        </DetailField>

        <DetailField label="Severity">
          <div className="space-y-2">
            <LogLevelBadge severity={log.severity} />

            <p className="text-sm">{formatLogSeverity(log.severity)}</p>
          </div>
        </DetailField>

        <DetailField label="Service">{log.service}</DetailField>

        <DetailField label="Environment">
          {formatEnvironment(log.environment)}
        </DetailField>

        <DetailField label="Message">
          <div className="rounded-md border bg-muted/40 p-4">
            <code className="font-mono text-sm whitespace-pre-wrap break-words">
              {log.message}
            </code>
          </div>
        </DetailField>
      </dl>
    </div>
  );
}
