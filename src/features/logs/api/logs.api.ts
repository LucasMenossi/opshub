import { api } from "@/lib/api";

import type { LogsResponse } from "./logs.types";

export async function getLogs(): Promise<LogsResponse> {
  const { data } = await api.get<LogsResponse>("/logs");

  return data;
}
