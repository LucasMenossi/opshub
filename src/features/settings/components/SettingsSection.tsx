import type { PropsWithChildren, ReactNode } from "react";

import { Card } from "@/components/UI";

interface SettingsSectionProps extends PropsWithChildren {
  title: string;
  description: string;
  action?: ReactNode;
}

export function SettingsSection({
  title,
  description,
  action,
  children,
}: SettingsSectionProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b p-6">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>

        {action}
      </div>

      <div className="p-6">{children}</div>
    </Card>
  );
}
