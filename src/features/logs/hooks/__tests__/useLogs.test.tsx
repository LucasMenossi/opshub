import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, test } from "vitest";

import { useLogs } from "../useLogs";
import { QueryTestProvider } from "@/test/QueryTestProvider";

function wrapper({ children }: { children: ReactNode }) {
  return <QueryTestProvider>{children}</QueryTestProvider>;
}

describe("useLogs", () => {
  test("loads the next page through the infinite query", async () => {
    const { result } = renderHook(() => useLogs(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0].items).toHaveLength(50);
    expect(result.current.hasNextPage).toBe(true);

    await result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

    expect(result.current.data?.pages[1].items).toHaveLength(50);
    expect(
      result.current.data?.pages.flatMap((page) => page.items),
    ).toHaveLength(100);
  });
});
