import { api } from "@/lib/api/client";

import type { Incident, IncidentDetails } from "./incidents.types";

export async function getIncidents(): Promise<Incident[]> {
  const { data } = await api.get<Incident[]>("/incidents");

  return data;
}

export async function getIncident(
  incidentId: string,
): Promise<IncidentDetails> {
  const { data } = await api.get<IncidentDetails>(`/incidents/${incidentId}`);

  return data;
}
