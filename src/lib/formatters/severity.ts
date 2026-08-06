import type { LogSeverity } from "@/features/logs";

export function formatLogSeverity(severity: LogSeverity): string {
  switch (severity) {
    case "trace":
      return "Trace";
    case "debug":
      return "Debug";
    case "info":
      return "Info";
    case "warning":
      return "Warning";
    case "error":
      return "Error";
    case "fatal":
      return "Fatal";
  }
}
