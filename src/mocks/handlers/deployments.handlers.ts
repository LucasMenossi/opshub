import { http, HttpResponse } from "msw";

import { deployments } from "@/features/deployments/data/deployments";

export const deploymentsHandlers = [
  http.get("/api/deployments", () => {
    return HttpResponse.json(deployments);
  }),
];
