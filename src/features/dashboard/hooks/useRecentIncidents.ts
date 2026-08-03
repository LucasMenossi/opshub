import { useQuery } from "@tanstack/react-query";

import { getIncidents } from "@/features/incidents/api";
import { queryKeys } from "@/lib/query/keys";

export function useRecentIncidents() {
  return useQuery({
    queryKey: queryKeys.incidents.all,
    queryFn: getIncidents,
    select: (incidents) =>
      [...incidents]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 3),
  });
}
