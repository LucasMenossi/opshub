import { http, HttpResponse } from "msw";

import { deployments } from "@/features/deployments/data/deployments";
import { serviceHealth } from "@/features/dashboard/data/service-health";
import { incidents } from "@/features/incidents/data/incidents";

export const dashboardHandlers = [
  http.get("/api/dashboard/metrics", () => {
    return HttpResponse.json({
      services: serviceHealth.length,
      deployments: deployments.length,
      incidents: incidents.filter(
        (incident) => incident.severity !== "resolved",
      ).length,
      uptime: 99.98,
    });
  }),

  http.get("/api/dashboard/service-health", () => {
    return HttpResponse.json(serviceHealth);
  }),
];
