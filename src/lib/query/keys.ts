export const queryKeys = {
  dashboard: {
    metrics: ["dashboard", "metrics"] as const,
    serviceHealth: ["dashboard", "service-health"] as const,
    deployments: ["dashboard", "deployments"] as const,
    incidents: ["dashboard", "incidents"] as const,
  },

  services: {
    all: ["services"] as const,
  },

  deployments: {
    all: ["deployments"] as const,
  },
} as const;
