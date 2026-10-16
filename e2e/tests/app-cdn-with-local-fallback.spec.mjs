import { test, expect } from '@playwright/test';
import { blockCdn } from '../helpers.mjs';

// `examples/app-cdn-with-local-fallback`: the bootstrap selects a CDN or local
// runtime per family and falls back when the CDN fails to load.
test.describe('app-cdn-with-local-fallback', () => {
  // The installed Tonic version may predate the standalone artifact: the
  // published tarball then lacks `dist/standalone/index.js`, the raw.esm.sh
  // file 404s, and the Tonic family falls back to local by design. The React
  // family always resolves from esm.sh. The test therefore pins its Tonic
  // expectation to the manifest's CDN candidate, probed before the page load.
  async function tonicCdnAvailable(request) {
    const manifest = await (await request.get('/runtime-manifest.json')).json();
    const url = manifest.groups.tonic.cdn.imports['@tonic-ui/react'];
    return (await request.get(url)).ok();
  }

  test('mounts from the local runtime when forced', async ({ page }) => {
    await page.goto('/?__local=react,tonic');
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.locator('body[data-react="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-tonic="local"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
  });

  test('mounts from the CDN runtime', async ({ page, request }) => {
    const tonicAvailable = await tonicCdnAvailable(request);
    await page.goto('/');
    // Wait for the mounted document so the dataset assertions observe the
    // family sources the app actually ran on, not the initial selection.
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
    await expect(page.locator('body[data-react="cdn"]')).toHaveCount(1);
    await expect(page.locator(`body[data-tonic="${tonicAvailable ? 'cdn' : 'local'}"]`)).toHaveCount(1);
    if (!tonicAvailable) {
      // The fallback reload records the failed family in the URL.
      expect(page.url()).toContain('__failed=');
    }
  });

  test('falls back to local when the CDN fails', async ({ page }) => {
    await blockCdn(page);
    await page.goto('/');
    // The bootstrap discards the failed realm and reloads with local forced.
    // The URL is percent-encoded: `__local=react%2Ctonic`.
    await page.waitForURL(/__local=react(%2C|,)tonic/);
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.locator('body[data-react="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-tonic="local"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
  });
});
