import type { ServiceHealth } from "../data/service-health";

export interface DashboardMetrics {
  services: number;
  deployments: number;
  incidents: number;
  uptime: number;
}

export type DashboardServiceHealth = ServiceHealth;
