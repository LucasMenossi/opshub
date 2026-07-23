import { http, HttpResponse } from "msw";

import { deployments } from "@/features/dashboard/data/deployments";
import { incidents } from "@/features/dashboard/data/incidents";
import { serviceHealth } from "@/features/dashboard/data/service-health";

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

  http.get("/api/dashboard/deployments", () => {
    return HttpResponse.json(deployments);
  }),

  http.get("/api/dashboard/incidents", () => {
    return HttpResponse.json(incidents);
  }),
];
