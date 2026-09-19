import { expect, test } from "@playwright/test";

test("searches services and opens service details", async ({ page }) => {
  await page.goto("/services");

  await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();

  const search = page.getByPlaceholder("Search services...");

  await search.fill("Payment");

  await expect(
    page.getByRole("link", { name: "Payment Service" }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "API Gateway" })).toHaveCount(0);

  await page.getByRole("link", { name: "Payment Service" }).click();

  await expect(page).toHaveURL(/\/services\/payment-service$/);
  await expect(
    page.getByRole("heading", { name: "Payment Service" }),
  ).toBeVisible();
});
