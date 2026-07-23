import { useQuery } from "@tanstack/react-query";

import { getDeployments } from "../api";
import { queryKeys } from "@/lib/query/keys";

export function useDeployments() {
  return useQuery({
    queryKey: queryKeys.deployments.all,
    queryFn: getDeployments,
  });
}
