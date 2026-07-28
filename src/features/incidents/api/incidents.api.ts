import { api } from "@/lib/api/client";

import type { Incident } from "./incidents.types";

export async function getIncidents(): Promise<Incident[]> {
  const { data } = await api.get<Incident[]>("/incidents");

  return data;
}
