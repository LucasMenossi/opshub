import { api } from "@/lib/api/client";

import type { Deployment } from "./deployments.types";

export async function getDeployments() {
  const { data } = await api.get<Deployment[]>("/deployments");

  return data;
}
