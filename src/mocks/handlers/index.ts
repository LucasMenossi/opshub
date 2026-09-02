import { dashboardHandlers } from "./dashboard.handlers";
import { deploymentsHandlers } from "./deployments.handlers";
import { incidentsHandlers } from "./incidents.handlers";
import { logsHandlers } from "./logs.handlers";
import { servicesHandlers } from "./services.handlers";
import { usersHandlers } from "./users.handlers";
import { featureFlagHandlers } from "./feature-flags.handlers";

export const handlers = [
  ...dashboardHandlers,
  ...servicesHandlers,
  ...deploymentsHandlers,
  ...incidentsHandlers,
  ...usersHandlers,
  ...logsHandlers,
  ...featureFlagHandlers,
];
