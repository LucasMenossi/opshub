import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { createTestQueryClient } from "./query-test-utils";

export function QueryTestProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
