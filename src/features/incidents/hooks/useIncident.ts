import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getIncident } from "../api";

export function useIncident(incidentId: string) {
  return useQuery({
    queryKey: queryKeys.incidents.detail(incidentId),
    queryFn: () => getIncident(incidentId),
  });
}
