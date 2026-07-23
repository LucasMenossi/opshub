export type DeploymentEnvironment = "production" | "staging";

export type DeploymentStatus =
  "pending" | "running" | "successful" | "failed" | "cancelled";

export interface Deployment {
  id: string;
  serviceId: string;
  service: string;
  version: string;

  environment: DeploymentEnvironment;

  commit: string;
  branch: string;

  author: string;

  status: DeploymentStatus;

  duration: number;

  deployedAt: string;
}
