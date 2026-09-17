import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { FeatureFlagsPage } from "@/features/feature-flags";

const featureFlagSearchSchema = z.object({
  q: z.string().optional(),
  enabled: z.boolean().optional(),
  owner: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/feature-flags/")({
  validateSearch: featureFlagSearchSchema,
  component: FeatureFlagsPage,
});
