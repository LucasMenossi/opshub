import type { ServiceHealth } from "../data/serviceHealth";

export interface DashboardMetrics {
  services: number;
  deployments: number;
  incidents: number;
  uptime: number;
}

export type DashboardServiceHealth = ServiceHealth;
