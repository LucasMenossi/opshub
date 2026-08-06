import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getLogs } from "../api";

export function useLogs() {
  return useQuery({
    queryKey: queryKeys.logs.all,
    queryFn: getLogs,
  });
}
