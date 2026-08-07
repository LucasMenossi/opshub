import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getLogs } from "../api";

interface UseLogsOptions {
  refetchInterval?: number | false;
}

export function useLogs(options?: UseLogsOptions) {
  return useQuery({
    queryKey: queryKeys.logs.all,
    queryFn: getLogs,
    refetchInterval: options?.refetchInterval,
  });
}
