import { expect, test } from "@playwright/test";

test("toggles a feature flag and shows the success feedback", async ({
  page,
}) => {
  await page.goto("/feature-flags");

  await expect(
    page.getByRole("heading", { name: "Feature Flags" }),
  ).toBeVisible();

  const row = page.getByRole("row").filter({ hasText: "new-dashboard" });
  const toggle = row.getByRole("switch");

  await expect(toggle).toHaveAttribute("aria-checked", "true");

  await toggle.click();

  await expect(toggle).toHaveAttribute("aria-checked", "false");
  await expect(page.getByText("Feature flag disabled")).toBeVisible();
});
