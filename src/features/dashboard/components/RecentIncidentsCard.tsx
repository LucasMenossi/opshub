import { Card, CardHeader } from "@/components/UI";

import { useRecentIncidents } from "../hooks";
import { IncidentItem } from "./IncidentItem";

export function RecentIncidentsCard() {
  const { data = [] } = useRecentIncidents();

  return (
    <Card className="p-6">
      <CardHeader
        title="Recent Incidents"
        description="Latest incidents across your platform."
      />

      <ul className="divide-y">
        {data.map((incident) => (
          <IncidentItem key={incident.id} incident={incident} />
        ))}
      </ul>
    </Card>
  );
}
