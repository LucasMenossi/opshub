import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DeploymentsPage } from "@/features/deployments";
import { optionalSearchEnum } from "@/utils/searchSchema";

const deploymentSearchSchema = z.object({
  q: z.string().optional(),

  status: optionalSearchEnum([
    "pending",
    "running",
    "successful",
    "failed",
    "cancelled",
  ]),

  environment: optionalSearchEnum(["production", "staging"]),
  sortBy: z.string().optional(),
  sortOrder: optionalSearchEnum(["asc", "desc"]),
});

export const Route = createFileRoute("/_authenticated/deployments/")({
  validateSearch: deploymentSearchSchema,
  component: DeploymentsPage,
});
