import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/lib/query/keys";

import { updateFeatureFlag } from "../api";
import type { FeatureFlag } from "../api";

export function useUpdateFeatureFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      updateFeatureFlag(id, enabled),

    onMutate: async ({ id, enabled }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.featureFlags.all,
      });

      const previousFlags = queryClient.getQueryData<FeatureFlag[]>(
        queryKeys.featureFlags.all,
      );

      queryClient.setQueryData<FeatureFlag[]>(
        queryKeys.featureFlags.all,
        (flags) =>
          flags?.map((flag) => (flag.id === id ? { ...flag, enabled } : flag)),
      );

      return { previousFlags };
    },

    onSuccess: (_data, { enabled }) => {
      toast.success(enabled ? "Feature flag enabled" : "Feature flag disabled");
    },

    onError: (_error, _variables, context) => {
      if (context?.previousFlags) {
        queryClient.setQueryData(
          queryKeys.featureFlags.all,
          context.previousFlags,
        );
      }

      toast.error("Failed to update feature flag");
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.featureFlags.all,
      });
    },
  });
}
