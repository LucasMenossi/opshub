import type { DataTableFilter } from "@/components/data-table";
import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";

import type { Environment, ServiceStatus } from "../data/services";

export const serviceStatuses: ServiceStatus[] = ["healthy", "degraded", "down"];

const serviceEnvironments: Environment[] = ["production", "staging"];

export const serviceTableFilters: DataTableFilter[] = [
  {
    columnId: "status",
    label: "Statuses",
    options: serviceStatuses.map((status) => ({
      value: status,
      label: formatServiceStatus(status),
    })),
  },
  {
    columnId: "environment",
    label: "Environments",
    options: serviceEnvironments.map((environment) => ({
      value: environment,
      label: formatEnvironment(environment),
    })),
  },
];
