import { dashboardHandlers } from "./dashboard.handlers";
import { deploymentsHandlers } from "./deployments.handlers";
import { incidentsHandlers } from "./incidents.handlers";
import { servicesHandlers } from "./services.handlers";

export const handlers = [
  ...dashboardHandlers,
  ...servicesHandlers,
  ...deploymentsHandlers,
  ...incidentsHandlers,
];
