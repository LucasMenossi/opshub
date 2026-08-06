import type { LogEntry, LogSeverity } from "../api";

const services = [
  { id: "svc-api", name: "API Gateway" },
  { id: "svc-auth", name: "Authentication" },
  { id: "svc-payments", name: "Payments" },
  { id: "svc-orders", name: "Orders" },
  { id: "svc-notifications", name: "Notifications" },
];

const severities: LogSeverity[] = [
  "info",
  "info",
  "info",
  "info",
  "debug",
  "debug",
  "warning",
  "error",
  "fatal",
];

const environments = ["production", "staging"] as const;

const messages = [
  "Request completed successfully.",
  "Incoming request received.",
  "User authenticated successfully.",
  "Database connection established.",
  "Retrying failed request.",
  "Cache invalidated.",
  "Background job started.",
  "Background job completed.",
  "Payment processed successfully.",
  "Payment provider timeout.",
  "Service unavailable.",
  "Unhandled exception occurred.",
  "Configuration loaded.",
  "Token expired.",
  "Health check passed.",
];

function randomTimestamp(index: number) {
  return new Date(Date.now() - index * 1000 * 60 * 5).toISOString();
}

export const logs: LogEntry[] = Array.from({ length: 200 }, (_, index) => {
  const service = services[index % services.length];

  return {
    id: `log-${index + 1}`,

    timestamp: randomTimestamp(index),

    serviceId: service.id,
    service: service.name,

    environment: environments[index % environments.length],

    severity: severities[index % severities.length],

    message: messages[index % messages.length],
  };
});
