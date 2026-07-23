import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { dashboardApi } from "../api/dashboard.api";

export function useRecentDeployments() {
  return useQuery({
    queryKey: queryKeys.dashboard.deployments,
    queryFn: () => dashboardApi.getDeployments(),
  });
}
