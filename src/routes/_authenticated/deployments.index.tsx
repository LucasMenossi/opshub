import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DeploymentsPage } from "@/features/deployments";

const deploymentSearchSchema = z.object({
  q: z.string().optional(),

  status: z
    .enum(["pending", "running", "successful", "failed", "cancelled"])
    .optional(),

  environment: z.enum(["production", "staging"]).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const Route = createFileRoute("/_authenticated/deployments/")({
  validateSearch: deploymentSearchSchema,
  component: DeploymentsPage,
});
