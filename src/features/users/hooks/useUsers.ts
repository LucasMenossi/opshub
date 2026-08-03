import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api";
import { queryKeys } from "@/lib/query/keys";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: getUsers,
  });
}
