import { Card } from "@/components/ui";

import { useServices } from "../hooks";
import { ServiceTableRow } from "./ServiceTableRow";

export function ServiceTable() {
  const { data = [] } = useServices();

  return (
    <Card className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="border-b text-left">
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Version</th>
            <th className="px-6 py-3 font-medium">Environment</th>
          </tr>
        </thead>

        <tbody>
          {data.map((service) => (
            <ServiceTableRow key={service.id} service={service} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
