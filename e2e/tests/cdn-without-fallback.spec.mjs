// CDN-only example: verify the shared bootstrap's import-map loading.
// There is no local fallback: an unreachable CDN leaves the application
// unmounted and shows a visible startup error instead.
//
// The Tonic UI group's CDN source prefers the published standalone artifact,
// served raw from the published npm tarball; when the installed package
// predates it, the build probes the published URL and selects the esm.sh
// build instead. The tests therefore pin their expectations to the manifest's
// Tonic UI candidate, probed before the page load.

import { test, expect } from '@playwright/test';
import { blockCdn } from './helpers.mjs';

test.describe('cdn-without-fallback', () => {
  async function tonicUiCdnAvailable(request) {
    const manifest = await (await request.get('/runtime-manifest.json')).json();
    const url = manifest.groups['tonic-ui'].cdn.imports['@tonic-ui/react'];
    return (await request.get(url)).ok();
  }

  test('mounts the demo app from a CDN-loaded runtime', async ({ page, request }) => {
    const tonicUiAvailable = await tonicUiCdnAvailable(request);
    await page.goto('/');
    if (tonicUiAvailable) {
      // Wait for the mounted document so the dataset assertions observe the
      // family sources the app actually ran on, not the initial selection.
      await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
      await expect(page.locator('body[data-react="cdn"]')).toHaveCount(1);
      await expect(page.locator('body[data-react-dom="cdn"]')).toHaveCount(1);
      await expect(page.locator('body[data-tonic-ui="cdn"]')).toHaveCount(1);
    } else {
      // A Tonic UI standalone artifact the published tarball lacks cannot
      // fall back: the document shows the startup error and the application
      // does not mount.
      await expect(page.locator('body[data-stage="error"]')).toHaveCount(1);
      await expect(page.locator('#root > *')).toHaveCount(0);
    }
  });

  test('shows a visible startup error when the CDN is unreachable', async ({ page }) => {
    await blockCdn(page);
    await page.goto('/');
    // The bootstrap has no local source to fall back to; the error state is
    // visible and the root stays empty.
    await expect(page.locator('body[data-stage="error"]')).toHaveCount(1);
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.locator('#root > *')).toHaveCount(0);
  });

  test('uses the CDN source when local is requested but absent', async ({ page, request }) => {
    const tonicUiAvailable = await tonicUiCdnAvailable(request);
    await page.goto('/?__local=react,react-dom,tonic-ui');
    if (tonicUiAvailable) {
      // With no local source in the manifest, a forced group yields to the
      // only available source instead of failing.
      await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
      await expect(page.locator('body[data-react="cdn"]')).toHaveCount(1);
      await expect(page.locator('body[data-react-dom="cdn"]')).toHaveCount(1);
      await expect(page.locator('body[data-tonic-ui="cdn"]')).toHaveCount(1);
    } else {
      await expect(page.locator('body[data-stage="error"]')).toHaveCount(1);
      await expect(page.locator('#root > *')).toHaveCount(0);
    }
  });
});