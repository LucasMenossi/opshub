import { useQuery } from "@tanstack/react-query";

import { getDeployments } from "@/features/deployments/api";
import { queryKeys } from "@/lib/query/keys";

export function useRecentDeployments() {
  return useQuery({
    queryKey: queryKeys.deployments.all,
    queryFn: getDeployments,
    select: (deployments) =>
      [...deployments]
        .sort(
          (a, b) =>
            new Date(b.deployedAt).getTime() - new Date(a.deployedAt).getTime(),
        )
        .slice(0, 3),
  });
}
