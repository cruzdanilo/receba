import { test, expect } from '@playwright/test';

test.describe('app', () => {
  test.beforeEach(({ page }) => page.goto('/'));

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('receba');
  });
});
