import { api } from "@/lib/api";

import type { FeatureFlag } from "./feature-flags.types";

export async function getFeatureFlags(): Promise<FeatureFlag[]> {
  const { data } = await api.get<FeatureFlag[]>("/feature-flags");

  return data;
}

export async function updateFeatureFlag(
  id: string,
  enabled: boolean,
): Promise<FeatureFlag> {
  const { data } = await api.patch<FeatureFlag>(`/feature-flags/${id}`, {
    enabled,
  });

  return data;
}
