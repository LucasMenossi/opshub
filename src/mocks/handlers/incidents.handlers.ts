import { http, HttpResponse } from "msw";

import { incidents } from "@/features/incidents/data/incidents";

export const incidentsHandlers = [
  http.get("/api/incidents", () => {
    return HttpResponse.json(incidents);
  }),
];
