import type { DataTableFilter } from "@/components/DataTable";
import { formatDeploymentStatus, formatEnvironment } from "@/lib/formatters";

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

export const deploymentTableFilters: DataTableFilter[] = [
  {
    columnId: "status",
    label: "Statuses",
    options: deploymentStatuses.map((status) => ({
      value: status,
      label: formatDeploymentStatus(status),
    })),
  },
  {
    columnId: "environment",
    label: "Environments",
    options: deploymentEnvironments.map((environment) => ({
      value: environment,
      label: formatEnvironment(environment),
    })),
  },
];
