import { render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { ServiceTable } from "../ServiceTable";
import { QueryTestProvider } from "@/test/QueryTestProvider";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...props }: { children: ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

function renderServiceTable() {
  return render(
    <QueryTestProvider>
      <ServiceTable />
    </QueryTestProvider>,
  );
}

describe("ServiceTable", () => {
  test("filters services by the search query", async () => {
    const user = userEvent.setup();
    renderServiceTable();

    expect(await screen.findByText("API Gateway")).toBeInTheDocument();
    expect(screen.getByText("Authentication")).toBeInTheDocument();

    const search = screen.getByPlaceholderText("Search services...");
    await user.type(search, "gateway");

    await waitFor(() => {
      expect(screen.getByText("API Gateway")).toBeInTheDocument();
      expect(screen.queryByText("Authentication")).not.toBeInTheDocument();
      expect(screen.queryByText("Payment Service")).not.toBeInTheDocument();
      expect(screen.queryByText("Notifications")).not.toBeInTheDocument();
    });
  });
});
