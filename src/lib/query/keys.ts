import type { LogsQueryParams } from "@/features/logs/api";

type LogsQueryKeyParams = LogsQueryParams & {
  timeRange?: string;
  customStart?: string;
  customEnd?: string;
};

export const queryKeys = {
  dashboard: {
    metrics: ["dashboard", "metrics"] as const,
    serviceHealth: ["dashboard", "service-health"] as const,
  },

  services: {
    all: ["services"] as const,
  },

  deployments: {
    all: ["deployments"] as const,
  },

  incidents: {
    all: ["incidents"] as const,
    detail: (incidentId: string) => ["incidents", incidentId] as const,
  },

  logs: {
    all: ["logs"] as const,

    list: (params?: LogsQueryKeyParams) => ["logs", "list", params] as const,
  },

  featureFlags: {
    all: ["feature-flags"] as const,
  },

  users: {
    all: ["users"] as const,
  },

  settings: {
    all: ["settings"] as const,
  },
} as const;
