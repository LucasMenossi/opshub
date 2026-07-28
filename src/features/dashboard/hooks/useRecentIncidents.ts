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
            new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
        )
        .slice(0, 3),
  });
}
