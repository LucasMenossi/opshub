import { api } from "@/lib/api/client";

import type {
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
};
