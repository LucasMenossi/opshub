import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { dashboardApi } from "../api/dashboard.api";

export function useRecentIncidents() {
  return useQuery({
    queryKey: queryKeys.dashboard.incidents,
    queryFn: () => dashboardApi.getIncidents(),
  });
}
