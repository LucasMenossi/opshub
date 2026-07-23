import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          {description && (
            <p className="mt-2 text-sm text-zinc-500">{description}</p>
          )}
        </div>

        {Icon && <Icon className="h-5 w-5 text-zinc-400" />}
      </div>
    </Card>
  );
}
