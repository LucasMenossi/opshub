import { http, HttpResponse } from "msw";

import { incidents } from "@/features/incidents/data/incidents";
import { incidentDetails } from "@/features/incidents/data/incident-details";

export const incidentsHandlers = [
  http.get("/api/incidents", () => {
    return HttpResponse.json(incidents);
  }),

  http.get("/api/incidents/:incidentId", ({ params }) => {
    const incident = incidentDetails.find(
      (incident) => incident.id === params.incidentId,
    );

    if (!incident) {
      return HttpResponse.json(
        { message: "Incident not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(incident);
  }),
];
