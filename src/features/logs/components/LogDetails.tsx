import { LogLevelBadge } from "@/components/badges";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui";

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
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const copied = copiedLogId === log?.id;

  const handleCopyMessage = async () => {
    if (!log) {
      return;
    }

    try {
      await navigator.clipboard.writeText(log.message);

      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      setCopiedLogId(log.id);

      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedLogId(null);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      setCopiedLogId(null);
    }
  };

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
        <div className="grid gap-6 sm:grid-cols-2">
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
        </div>

        <DetailField label="Message">
          <div className="overflow-hidden rounded-md border bg-muted/40">
            <div className="flex items-center justify-between border-b px-3 py-2">
              <span className="text-xs text-muted-foreground">Log message</span>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyMessage}
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="max-h-96 overflow-auto p-4">
              <code className="font-mono text-sm whitespace-pre-wrap wrap-break-word">
                {log.message}
              </code>
            </div>
          </div>
        </DetailField>
      </dl>
    </div>
  );
}
