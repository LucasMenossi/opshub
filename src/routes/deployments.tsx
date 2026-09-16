import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DeploymentsPage } from "@/features/deployments";

const deploymentSearchSchema = z.object({
  q: z.string().optional(),

  status: z
    .enum(["pending", "running", "successful", "failed", "cancelled"])
    .optional(),

  environment: z.enum(["production", "staging"]).optional(),
});

export const Route = createFileRoute("/deployments")({
  validateSearch: deploymentSearchSchema,
  component: DeploymentsPage,
});
