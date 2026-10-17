// CDN runtime inspector: an isolated shell observes a disposable runtime frame.
// Verify local-only loading without CDN requests, per-family failure fallback,
// and CDN-first selection against the published Tonic UI artifact's actual
// availability.

import { test, expect } from '@playwright/test';

const cdnHosts = /https:\/\/(?:raw\.)?esm\.sh\//;

test.describe('cdn-with-local-fallback', () => {
  test('all-local scenario uses only same-origin files', async ({ page }) => {
    const cdnRequests = [];
    page.on('request', request => {
      if (cdnHosts.test(request.url())) {
        cdnRequests.push(request.url());
      }
    });
    await page.goto('inspector.html?scenario=all-local');
    await expect(page.getByRole('button', { name: 'Use local for all groups' })).toBeVisible();
    await expect(page.locator('#react-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#react-dom-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#tonic-ui-source')).toHaveText('Local (same origin)');
    expect(cdnRequests).toEqual([]);
  });

  test('all-cdn-fail scenario falls back to local', async ({ page }) => {
    await page.goto('inspector.html?scenario=all-cdn-fail');
    await expect(page.locator('#react-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#react-dom-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#tonic-ui-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#runtime-log')).toContainText('react: cdn (failed)');
    await expect(page.locator('#runtime-log')).toContainText('react-dom: cdn (failed)');
    await expect(page.locator('#runtime-log')).toContainText('tonic-ui: cdn (failed)');
    // The shell owns the manifest section and loads it independently of the
    // runtime frame, so it stays inspectable when the CDN fails.
    await page.getByRole('button', { name: 'Show runtime manifest' }).click();
    await expect(page.locator('#runtime-manifest')).toContainText('"groups"');
  });

  test('cdn-first scenario selects the available sources', async ({ page, request }) => {
    const manifest = await (await request.get('runtime-manifest.json')).json();
    // The Tonic UI group prefers the published standalone artifact; when the
    // published tarball lacks it, the build selects the esm.sh build instead.
    const tonicAvailable = (await request.get(manifest.groups['tonic-ui'].cdn.imports['@tonic-ui/react'])).ok();
    await page.goto('inspector.html?scenario=cdn-first');
    await expect(page.locator('#react-source')).toHaveText('CDN');
    await expect(page.locator('#react-dom-source')).toHaveText('CDN');
    await expect(page.locator('#tonic-ui-source')).toHaveText(tonicAvailable ? 'CDN' : 'Local (same origin)');
  });

  test('collapses the runtime manifest by default and toggles it', async ({ page }) => {
    await page.goto('inspector.html?scenario=all-local');
    const manifest = page.locator('#runtime-manifest');
    await expect(manifest).toHaveCount(0);
    await page.getByRole('button', { name: 'Show runtime manifest' }).click();
    await expect(manifest).toContainText('"groups"');
    await page.getByRole('button', { name: 'Hide runtime manifest' }).click();
    await expect(manifest).toHaveCount(0);
  });

  // The shell URL does not take `__local`: the scenario selects the runtime.
  // `__local` and `__failed` are the runtime frame's internal fallback state,
  // so the default cdn-first scenario still selects the CDN React source.
  test('scenario selects the runtime even when the shell URL also has __local', async ({ page }) => {
    await page.goto('inspector.html?scenario=cdn-first&__local=react,react-dom,tonic-ui');
    await expect(page.locator('#react-source')).toHaveText('CDN');
  });
});
