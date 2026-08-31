import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getFeatureFlags } from "../api";

export function useFeatureFlags() {
  return useQuery({
    queryKey: queryKeys.featureFlags.all,
    queryFn: getFeatureFlags,
  });
}
