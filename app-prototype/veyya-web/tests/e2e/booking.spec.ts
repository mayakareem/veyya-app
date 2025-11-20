import { test, expect } from "@playwright/test";

test("can browse and open booking", async ({ page }) => {
  await page.goto("http://localhost:3000/search");
  await page.getByText("Lina Beauty Studio").click();
  await page.getByRole("link", { name: /Book this provider/i }).click();
  await expect(page.getByText(/Book/)).toBeVisible();
});
