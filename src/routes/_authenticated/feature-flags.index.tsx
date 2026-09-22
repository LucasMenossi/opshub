import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { FeatureFlagsPage } from "@/features/feature-flags";

const featureFlagSearchSchema = z.object({
  q: z.string().optional(),

  enabled: z.preprocess((value) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;

    return undefined;
  }, z.boolean().optional()),

  owner: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const Route = createFileRoute("/_authenticated/feature-flags/")({
  validateSearch: featureFlagSearchSchema,
  component: FeatureFlagsPage,
});
