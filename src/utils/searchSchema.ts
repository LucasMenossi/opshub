import { z } from "zod";

export function optionalSearchEnum<
  const T extends readonly [string, ...string[]],
>(values: T) {
  return z.preprocess(
    (value) =>
      typeof value === "string" && values.includes(value) ? value : undefined,
    z.enum(values).optional(),
  );
}
