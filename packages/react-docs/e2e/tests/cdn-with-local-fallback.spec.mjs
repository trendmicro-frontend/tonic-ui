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
    await page.goto('index.html?scenario=all-local');
    await expect(page.getByRole('button', { name: 'Use local for all groups' })).toBeVisible();
    await expect(page.locator('#react-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#tonic-source')).toHaveText('Local (same origin)');
    expect(cdnRequests).toEqual([]);
  });

  test('all-cdn-fail scenario falls back to local', async ({ page }) => {
    await page.goto('index.html?scenario=all-cdn-fail');
    await expect(page.locator('#react-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#tonic-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#runtime-log')).toContainText('react: cdn (failed)');
    await expect(page.locator('#runtime-log')).toContainText('tonic: cdn (failed)');
  });

  test('cdn-first scenario selects the available sources', async ({ page, request }) => {
    const manifest = await (await request.get('runtime-manifest.json')).json();
    // A locally built standalone file may be absent from the published tarball.
    const tonicAvailable = (await request.get(manifest.groups.tonic.cdn.imports['@tonic-ui/react'])).ok();
    await page.goto('index.html?scenario=cdn-first');
    await expect(page.locator('#react-source')).toHaveText('CDN (esm.sh)');
    await expect(page.locator('#tonic-source')).toHaveText(tonicAvailable ? 'CDN (esm.sh)' : 'Local (same origin)');
  });
});
