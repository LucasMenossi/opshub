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

  users: {
    all: ["users"] as const,
  },
} as const;
