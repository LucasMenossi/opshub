import { QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

import { render, screen, waitFor, within } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { http, HttpResponse } from "msw";

import { describe, expect, test, vi } from "vitest";

import { z } from "zod";

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

const featureFlagSearchSchema = z.object({
  q: z.string().optional(),
  enabled: z.boolean().optional(),
  owner: z.string().optional(),
});

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

    const rootRoute = createRootRoute({
      component: Outlet,
    });

    const featureFlagsRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/feature-flags",
      validateSearch: featureFlagSearchSchema,
      component: FeatureFlagTable,
    });

    const routeTree = rootRoute.addChildren([featureFlagsRoute]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/feature-flags"],
      }),
      scrollRestoration: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const toggles = await screen.findAllByRole("switch");

    const toggle = toggles.find(
      (switchElement) => switchElement.getAttribute("aria-checked") === "false",
    );

    expect(toggle).toBeDefined();

    const row = toggle!.closest("tr");

    expect(row).not.toBeNull();

    expect(toggle).toHaveAttribute("aria-checked", "false");

    expect(
      within(row as HTMLElement).getByText("Disabled"),
    ).toBeInTheDocument();

    await user.click(toggle!);

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-checked", "true");

      expect(
        within(row as HTMLElement).getByText("Enabled"),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-checked", "false");

      expect(
        within(row as HTMLElement).getByText("Disabled"),
      ).toBeInTheDocument();
    });
  });
});
