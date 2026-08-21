import { Badge } from "@/components/UI";

import type { LogSeverity } from "@/features/logs";
import { formatLogSeverity } from "@/lib/formatters";

interface LogLevelBadgeProps {
  severity: LogSeverity;
}

const tones = {
  trace: "default",
  debug: "info",
  info: "success",
  warning: "warning",
  error: "danger",
  fatal: "danger",
} as const;

export function LogLevelBadge({ severity }: LogLevelBadgeProps) {
  return <Badge tone={tones[severity]}>{formatLogSeverity(severity)}</Badge>;
}
