import { api } from "@/lib/api";

import type { Settings } from "./settings.types";

export async function getSettings(): Promise<Settings> {
  const { data } = await api.get<Settings>("/settings");

  return data;
}

export async function updateSettings(settings: Settings): Promise<Settings> {
  const { data } = await api.patch<Settings>("/settings", settings);

  return data;
}
