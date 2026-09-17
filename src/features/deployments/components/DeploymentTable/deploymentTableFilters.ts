import { formatDeploymentStatus, formatEnvironment } from "@/lib/formatters";
import type { FilterOption } from "@/lib/types/filterOption";

import type { DeploymentEnvironment, DeploymentStatus } from "../../api";

const deploymentStatuses: DeploymentStatus[] = [
  "pending",
  "running",
  "successful",
  "failed",
  "cancelled",
];

const deploymentEnvironments: DeploymentEnvironment[] = [
  "production",
  "staging",
];

export const deploymentStatusOptions: FilterOption[] = deploymentStatuses.map(
  (status) => ({
    value: status,
    label: formatDeploymentStatus(status),
  }),
);

export const deploymentEnvironmentOptions: FilterOption[] =
  deploymentEnvironments.map((environment) => ({
    value: environment,
    label: formatEnvironment(environment),
  }));
