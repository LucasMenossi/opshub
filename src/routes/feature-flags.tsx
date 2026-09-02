import { createFileRoute } from "@tanstack/react-router";

import { FeatureFlagsPage } from "@/features/feature-flags";

export const Route = createFileRoute("/feature-flags")({
  component: FeatureFlagsPage,
});
