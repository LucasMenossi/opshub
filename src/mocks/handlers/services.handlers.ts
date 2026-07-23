import { http, HttpResponse } from "msw";

import { services } from "@/features/services/data/services";

export const servicesHandlers = [
  http.get("/api/services", () => {
    return HttpResponse.json(services);
  }),
];
