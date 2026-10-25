// esm-cdn-with-fallback example: verify forced-local, CDN-first, and outage
// startup paths. Assert selected sources only after the final document mounts.
// The @tonic-ui/react group's CDN source prefers the published standalone artifact,
// served raw from the published npm tarball; when the installed package
// predates it, the build probes the published URL and selects the esm.sh
// build instead.

import { test, expect } from '@playwright/test';
import { blockCdn } from '../../support/cdn.mjs';

test.describe('esm-cdn-with-fallback', { tag: ['@example', '@cdn'] }, () => {
  // The @tonic-ui/react group's source may resolve to its local candidate when
  // the published tarball lacks the standalone artifact: the raw.esm.sh file
  // 404s and the family falls back to local by design. The React and React
  // DOM families always resolve from esm.sh. The test therefore pins its
  // @tonic-ui/react expectation to the manifest's CDN candidate, probed before
  // the page load.
  async function tonicUiReactCdnAvailable(request) {
    const manifest = await (await request.get('/runtime-manifest.json')).json();
    const url = manifest.groups['@tonic-ui/react'].cdn.imports['@tonic-ui/react'];
    return (await request.get(url)).ok();
  }

  test('mounts from the local runtime when forced', async ({ page }) => {
    await page.goto('/?__local=react,react-dom,@tonic-ui/react');
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.locator('body[data-react="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-react-dom="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-tonic-ui-react="local"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
  });

  test('mounts from the CDN runtime', async ({ page, request }) => {
    const tonicUiReactAvailable = await tonicUiReactCdnAvailable(request);
    await page.goto('/');
    // Wait for the mounted document so the dataset assertions observe the
    // family sources the app actually ran on, not the initial selection.
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
    await expect(page.locator('body[data-react="cdn"]')).toHaveCount(1);
    await expect(page.locator('body[data-react-dom="cdn"]')).toHaveCount(1);
    await expect(page.locator(`body[data-tonic-ui-react="${tonicUiReactAvailable ? 'cdn' : 'local'}"]`)).toHaveCount(1);
    if (!tonicUiReactAvailable) {
      // The fallback reload records the failed family in the URL.
      expect(page.url()).toContain('__failed=');
    }
  });

  test('falls back to local when the CDN fails', async ({ page }) => {
    await blockCdn(page);
    await page.goto('/');
    // The bootstrap discards the failed realm and reloads with local forced.
    await page.waitForURL(url => url.searchParams.get('__local') === 'react,react-dom,@tonic-ui/react');
    expect(new URL(page.url()).searchParams.get('__failed').split(',')).toContain('@tonic-ui/react');
    await expect(page.locator('body[data-stage="mounted"]')).toHaveCount(1);
    await expect(page.locator('body[data-react="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-react-dom="local"]')).toHaveCount(1);
    await expect(page.locator('body[data-tonic-ui-react="local"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Demo app' })).toBeVisible();
  });
});
