import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { dashboardApi } from "../api/dashboard.api";

export function useServiceHealth() {
  return useQuery({
    queryKey: queryKeys.dashboard.serviceHealth,
    queryFn: () => dashboardApi.getServiceHealth(),
  });
}
