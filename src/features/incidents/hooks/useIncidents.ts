import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getIncidents } from "../api";

export function useIncidents() {
  return useQuery({
    queryKey: queryKeys.incidents.all,
    queryFn: getIncidents,
  });
}
