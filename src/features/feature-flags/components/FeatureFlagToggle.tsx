import { Button } from "@/components/UI";

import { useUpdateFeatureFlag } from "../hooks";

interface FeatureFlagToggleProps {
  id: string;
  enabled: boolean;
}

export function FeatureFlagToggle({ id, enabled }: FeatureFlagToggleProps) {
  const { mutate, isPending } = useUpdateFeatureFlag();

  return (
    <Button
      type="button"
      size="sm"
      variant={enabled ? "default" : "ghost"}
      disabled={isPending}
      aria-pressed={enabled}
      onClick={() => mutate({ id, enabled: !enabled })}
    >
      {enabled ? "Enabled" : "Disabled"}
    </Button>
  );
}
