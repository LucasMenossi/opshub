import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { ServiceTable } from "../ServiceTable";
import { QueryTestProvider } from "@/test/QueryTestProvider";

const navigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  useSearch: () => ({}),
  useNavigate: () => navigate,
}));

describe("ServiceTable", () => {
  test("filters services by the search query", async () => {
    const user = userEvent.setup();

    render(
      <QueryTestProvider>
        <ServiceTable />
      </QueryTestProvider>,
    );

    expect(await screen.findByText("API Gateway")).toBeInTheDocument();
    expect(screen.getByText("Authentication")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search services...");

    await user.type(searchInput, "gateway");

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith({
        search: {
          q: "gateway",
        },
        replace: true,
      });
    });
  });
});
