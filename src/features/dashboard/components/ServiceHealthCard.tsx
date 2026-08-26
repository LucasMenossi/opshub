import { Card, CardHeader } from "@/components/UI";

import { useServiceHealth } from "../hooks";
import { ServiceHealthItem } from "./ServiceHealthItem";

export function ServiceHealthCard() {
  const { data = [] } = useServiceHealth();

  return (
    <Card className="h-full p-6">
      <CardHeader
        title="Service Health"
        description="Current status of platform services."
      />

      <ul className="divide-y">
        {data.map((service) => (
          <ServiceHealthItem key={service.id} service={service} />
        ))}
      </ul>
    </Card>
  );
}
