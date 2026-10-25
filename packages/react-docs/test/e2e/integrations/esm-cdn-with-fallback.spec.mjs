// CDN runtime inspector: an isolated shell observes a disposable runtime frame.
// Verify local-only loading without CDN requests, per-family failure fallback,
// and CDN-first selection against the published @tonic-ui/react artifact's
// actual availability.

import { test, expect } from '@playwright/test';

const cdnHosts = /https:\/\/(?:raw\.)?esm\.sh\//;

test.describe('esm-cdn-with-fallback', { tag: ['@docs', '@integration', '@cdn'] }, () => {
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
    await expect(page.locator('#tonic-ui-react-source')).toHaveText('Local (same origin)');
    expect(cdnRequests).toEqual([]);
  });

  test('all-cdn-fail scenario falls back to local', async ({ page, request }) => {
    await page.goto('inspector.html?scenario=all-cdn-fail');
    await expect(page.locator('#react-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#react-dom-source')).toHaveText('Local (same origin)');
    await expect(page.locator('#tonic-ui-react-source')).toHaveText('Local (same origin)');
    const runtimeFrame = page.frames().find(frame => frame.url().includes('/runtime.html'));
    expect(new URL(runtimeFrame.url()).searchParams.get('__failed').split(','))
      .toEqual(['react', 'react-dom', '@tonic-ui/react']);
    // The shell links to the manifest independently of the runtime frame, so it
    // stays inspectable when the CDN fails.
    const manifestLink = page.getByRole('link', { name: 'Open runtime manifest' });
    await expect(manifestLink).toHaveAttribute('href', './runtime-manifest.json');
    const manifestResponse = await request.get(await manifestLink.getAttribute('href'));
    expect(manifestResponse.ok()).toBe(true);
    expect(await manifestResponse.text()).toContain('"groups"');
  });

  test('cdn-first scenario selects the available sources and displays their hosts', async ({ page, request }) => {
    const manifest = await (await request.get('runtime-manifest.json')).json();
    const tonicUiReactUrl = manifest.groups['@tonic-ui/react'].cdn.imports['@tonic-ui/react'];
    const tonicUiReactHost = new URL(tonicUiReactUrl).hostname;
    const tonicUiReactAvailable = (await request.get(tonicUiReactUrl)).ok();
    await page.goto('inspector.html?scenario=cdn-first');
    await expect(page.locator('#react-source')).toHaveText('esm.sh');
    await expect(page.locator('#react-dom-source')).toHaveText('esm.sh');
    await expect(page.locator('#tonic-ui-react-source')).toHaveText(
      tonicUiReactAvailable ? tonicUiReactHost : 'Local (same origin)',
    );
    await expect(page.getByRole('row', { name: /@tonic-ui\/react/ })).toBeVisible();
    await expect(page.locator('#runtime-log')).toContainText(
      tonicUiReactAvailable ? `✔ @tonic-ui/react: ${tonicUiReactHost}` : '✔ @tonic-ui/react: local',
    );
  });

  test('opens the runtime manifest in a new window', async ({ page, context }) => {
    await page.goto('inspector.html?scenario=all-local');
    const [manifestPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Open runtime manifest' }).click(),
    ]);
    await expect(manifestPage).toHaveURL(/\/runtime-manifest\.json$/);
    await expect(manifestPage.locator('body')).toContainText('"groups"');
  });

  // The shell URL does not take `__local`: the scenario selects the runtime.
  // `__local` and `__failed` are the runtime frame's internal fallback state,
  // so the default cdn-first scenario still selects the esm.sh React source.
  test('scenario selects the runtime even when the shell URL also has __local', async ({ page }) => {
    await page.goto('inspector.html?scenario=cdn-first&__local=react,react-dom,@tonic-ui/react');
    await expect(page.locator('#react-source')).toHaveText('esm.sh');
  });
});
