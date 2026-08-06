import { Badge } from "@/components/ui";

import type { LogSeverity } from "@/features/logs";

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
  return <Badge tone={tones[severity]}>{severity.toUpperCase()}</Badge>;
}
