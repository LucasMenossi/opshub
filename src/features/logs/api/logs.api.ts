import { api } from "@/lib/api";

import type { LogsQueryParams, LogsResponse } from "./logs.types";

export async function getLogs(
  params: LogsQueryParams = {},
): Promise<LogsResponse> {
  const { data } = await api.get<LogsResponse>("/logs", {
    params,
  });

  return data;
}
