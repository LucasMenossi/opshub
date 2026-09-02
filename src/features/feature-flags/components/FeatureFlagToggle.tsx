import { cn } from "@/lib/utils";

import { useUpdateFeatureFlag } from "../hooks";

interface FeatureFlagToggleProps {
  id: string;
  enabled: boolean;
}

export function FeatureFlagToggle({ id, enabled }: FeatureFlagToggleProps) {
  const { mutate, isPending } = useUpdateFeatureFlag();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Disable feature flag" : "Enable feature flag"}
      disabled={isPending}
      onClick={() =>
        mutate({
          id,
          enabled: !enabled,
        })
      }
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer",
        "rounded-full p-0.5",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full",
          "bg-white shadow-md",
          "transition-transform duration-200",
          enabled ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
