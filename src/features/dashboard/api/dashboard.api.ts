import { api } from "@/lib/api/client";

import type {
  DashboardIncident,
  DashboardMetrics,
  DashboardServiceHealth,
} from "./dashboard.types";

export const dashboardApi = {
  async getMetrics(): Promise<DashboardMetrics> {
    const { data } = await api.get<DashboardMetrics>("/dashboard/metrics");
    return data;
  },

  async getServiceHealth(): Promise<DashboardServiceHealth[]> {
    const { data } = await api.get<DashboardServiceHealth[]>(
      "/dashboard/service-health",
    );

    return data;
  },

  async getIncidents(): Promise<DashboardIncident[]> {
    const { data } = await api.get<DashboardIncident[]>("/dashboard/incidents");

    return data;
  },
};
