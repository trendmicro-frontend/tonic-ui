// CDN-only example: verify production import-map loading and counter interaction.
// Blocking the CDN must leave the application unmounted; there is no fallback.

import { test, expect } from '@playwright/test';
import { blockCdn } from './helpers.mjs';

test.describe('app-cdn', () => {
  test('mounts and interacts with a Tonic UI loaded from a CDN', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Tonic UI from a CDN' })).toBeVisible();
    await page.getByRole('button', { name: 'Clicked 0 times' }).click();
    await expect(page.getByRole('button', { name: 'Clicked 1 times' })).toBeVisible();
  });

  test('does not mount when the CDN is unreachable', async ({ page }) => {
    // The app has no local fallback: an unreachable CDN leaves the root empty.
    await blockCdn(page);
    await page.goto('/');
    await page.waitForTimeout(2_000);
    await expect(page.locator('#root > *')).toHaveCount(0);
  });
});
