import { logs } from "@/features/logs/data/logs";
import { http, HttpResponse } from "msw";

export const logsHandlers = [
  http.get("/api/logs", () => {
    return HttpResponse.json({
      items: logs,
      nextCursor: undefined,
    });
  }),
];
