export type ServicesResponse = Service[];
export type Environment = "production" | "staging";
export type ServiceStatus = "healthy" | "degraded" | "down";

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  version: string;
  environment: Environment;
  uptime: number;
  owner: string;
  lastDeployment: string;
}
