import "@testing-library/jest-dom/vitest";

import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "./server";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
