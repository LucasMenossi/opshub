import { formatEnvironment, formatServiceStatus } from "@/lib/formatters";
import type { FilterOption } from "@/lib/types/filterOption";
import type { Environment, ServiceStatus } from "../../api";

export const serviceStatuses: ServiceStatus[] = ["healthy", "degraded", "down"];

const serviceEnvironments: Environment[] = ["production", "staging"];

export const serviceStatusOptions: FilterOption[] = serviceStatuses.map(
  (status) => ({
    value: status,
    label: formatServiceStatus(status),
  }),
);

export const serviceEnvironmentOptions: FilterOption[] =
  serviceEnvironments.map((environment) => ({
    value: environment,
    label: formatEnvironment(environment),
  }));
