import type { LogEntry } from "../api";
import { createUniqueFilterOptions } from "@/lib/table";
import { formatEnvironment } from "@/lib/formatters";

export function getLogFilterOptions(logs: LogEntry[]) {
  return {
    serviceOptions: createUniqueFilterOptions(logs, (log) => log.service),

    environmentOptions: createUniqueFilterOptions(
      logs,
      (log) => log.environment,
      formatEnvironment,
    ),
  };
}
