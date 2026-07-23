import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { dashboardApi } from "../api/dashboard.api";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics,
    queryFn: () => dashboardApi.getMetrics(),
  });
}
