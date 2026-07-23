import { deployments } from "@/features/dashboard/data/deployments";
import { http, HttpResponse } from "msw";

export const deploymentsHandlers = [
  http.get("/api/deployments", () => {
    return HttpResponse.json(deployments);
  }),
];
