import type { FeatureFlag } from "../api";

export const featureFlags: FeatureFlag[] = [
  {
    id: "feature-flag-1",
    name: "new-dashboard",
    description: "Enable the new dashboard experience.",
    enabled: true,
    rollout: 100,
    ownerId: "1",
    serviceId: "svc-dashboard",
  },
  {
    id: "feature-flag-2",
    name: "advanced-search",
    description: "Enable advanced search functionality.",
    enabled: false,
    rollout: 0,
    ownerId: "2",
    serviceId: "svc-search",
  },
  {
    id: "feature-flag-3",
    name: "log-streaming",
    description: "Enable real-time log streaming.",
    enabled: true,
    rollout: 25,
    ownerId: "3",
    serviceId: "svc-logs",
  },
  {
    id: "feature-flag-4",
    name: "deployment-insights",
    description: "Enable deployment performance insights.",
    enabled: false,
    rollout: 10,
    ownerId: "4",
    serviceId: "svc-deployments",
  },
];
