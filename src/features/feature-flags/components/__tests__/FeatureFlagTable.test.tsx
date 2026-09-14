import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, test, vi } from "vitest";

import { FeatureFlagTable } from "../FeatureFlagTable";
import { featureFlags } from "../../data/feature-flags";
import { users } from "@/features/users/data/users";
import { queryKeys } from "@/lib/query/keys";
import { createTestQueryClient } from "@/test/query-test-utils";
import { server } from "@/test/server";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("FeatureFlagTable", () => {
  test("updates optimistically and rolls back when the mutation fails", async () => {
    const user = userEvent.setup();
    const queryClient = createTestQueryClient();

    queryClient.setQueryData(queryKeys.featureFlags.all, featureFlags);
    queryClient.setQueryData(queryKeys.users.all, users);

    server.use(
      http.patch("/api/feature-flags/:id", async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json({ message: "failed" }, { status: 500 });
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FeatureFlagTable />
      </QueryClientProvider>,
    );

    const toggles = screen.getAllByRole("switch", {
      name: "Enable feature flag",
    });
    const toggle = toggles[0];

    expect(toggle).toHaveAttribute("aria-checked", "false");
    const row = toggle.closest("tr");
    expect(row).not.toBeNull();
    expect(within(row as HTMLElement).getByText("Disabled")).toBeInTheDocument();

    await user.click(toggle);

    await waitFor(() => {
      expect(within(row as HTMLElement).getByRole("switch", {
        name: "Disable feature flag",
      })).toHaveAttribute("aria-checked", "true");
      expect(within(row as HTMLElement).getByText("Enabled")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(within(row as HTMLElement).getByRole("switch", {
        name: "Enable feature flag",
      })).toHaveAttribute("aria-checked", "false");
    });
  });
});
