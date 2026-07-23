import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { servicesApi } from "../api/services.api";

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services.all,
    queryFn: () => servicesApi.getServices(),
  });
}
