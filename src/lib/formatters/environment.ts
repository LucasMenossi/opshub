export type Environment = "production" | "staging";

export function formatEnvironment(environment: string) {
  switch (environment) {
    case "production":
      return "Production";
    case "staging":
      return "Staging";
    default:
      return environment;
  }
}
