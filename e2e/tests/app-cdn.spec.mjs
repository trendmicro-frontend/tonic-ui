import { test, expect } from '@playwright/test';
import { blockCdn } from '../helpers.mjs';

// `examples/app-cdn`: a CDN-only reference app. React and Tonic UI resolve
// through an esm.sh import map generated at build time.
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
