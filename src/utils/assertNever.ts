export function assertNever(value: never): never {
  throw new Error(`Unexpected log severity: ${value}`);
}
