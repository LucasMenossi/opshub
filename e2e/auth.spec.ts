import { expect, test } from "@playwright/test";

test("login with demo credentials", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: /sign in|login/i }),
  ).toBeVisible();

  await page.getByLabel("Email").fill("admin@opshub.dev");
  await page.getByLabel("Password").fill("opshub");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
