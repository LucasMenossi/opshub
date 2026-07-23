import { dashboardHandlers } from "./dashboard.handlers";
import { servicesHandlers } from "./services.handlers";

export const handlers = [...dashboardHandlers, ...servicesHandlers];
