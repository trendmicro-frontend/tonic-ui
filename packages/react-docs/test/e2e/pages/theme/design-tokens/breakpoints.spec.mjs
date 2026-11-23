import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../../test/e2e/screenshots.mjs';
import { breakpoints } from '../../../../../utils/default-breakpoints.js';
import { formatBreakpoint } from '../../../../../utils/convert-breakpoint-width.mjs';

const slugs = ['borders', 'breakpoints', 'colors', 'fonts', 'fontSizes', 'fontWeights', 'lineHeights', 'outlines', 'radii', 'shadows', 'sizes', 'space', 'zIndices'];

const expectTokens = async (page) => {
  const tokens = page.locator('#main').getByRole('table').filter({ has: page.getByRole('columnheader', { name: 'Token' }) });
  await expect(tokens.getByRole('columnheader', { name: 'Width (px)', exact: true })).toBeVisible();
  for (const name of breakpoints.keys) {
    const row = tokens.getByRole('row').filter({ has: page.getByRole('cell', { name, exact: true }) });
    await expect(row.getByRole('cell')).toHaveText([name, formatBreakpoint(breakpoints, name), String(parseFloat(formatBreakpoint(breakpoints, name, 'px')))]);
  }
};

test('separates Theme guides from all design token destinations', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');

  const sidebar = page.locator('#sidenav');
  const main = page.locator('#main');
  const theme = sidebar.locator('[data-title="Theme"]').locator('..');
  const guide = theme.getByRole('link', { name: 'Media queries', exact: true });
  const token = sidebar.getByRole('link', { name: 'breakpoints', exact: true });
  const order = theme.locator('[data-path="theme"], [data-path="theme/media-queries"], [data-path="theme/container-queries"], [data-path^="theme/design-tokens/"], :text-is("DESIGN TOKENS")');
  await expect(order).toHaveText(['Getting started', 'Media queries', 'Container queries', 'DESIGN TOKENS', ...slugs]);
  await expect(token).toHaveAttribute('aria-selected', 'true');
  await expect(guide).toHaveAttribute('aria-selected', 'false');
  await expect(main.getByRole('heading', { name: 'API', exact: true })).toHaveCount(0);
  await expectTokens(page);

  for (const slug of slugs) {
    const link = sidebar.getByRole('link', { name: slug, exact: true });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/theme/design-tokens/${slug}/$`));
    await expect(link).toHaveAttribute('aria-selected', 'true');
    await expect(main.getByRole('heading', { name: slug, level: 1, exact: true })).toBeVisible();
  }

  await token.click();
  await main.getByRole('link', { name: 'Media queries', exact: true }).click();
  await expect(page).toHaveURL(/\/theme\/media-queries\/$/);
  await expect(guide).toHaveAttribute('aria-selected', 'true');
  await expect(token).toHaveAttribute('aria-selected', 'false');
  await expect(main.getByRole('heading', { name: 'API', exact: true })).toBeVisible();
  await expect(main.getByRole('columnheader', { name: 'Token' })).toHaveCount(0);
  await main.getByRole('link', { name: 'breakpoint tokens', exact: true }).click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/breakpoints\/$/);
  await main.getByRole('link', { name: 'Container queries', exact: true }).click();
  await expect(page).toHaveURL(/\/theme\/container-queries\/$/);
  await expect(main.getByRole('heading', { name: 'Container queries', level: 1, exact: true })).toBeVisible();
});

test('links to the new token routes from authored and generated references', async ({ page }) => {
  const main = page.locator('#main');
  await page.goto('../../../components/color-style/');
  const semantic = main.getByRole('link', { name: 'semantic tokens', exact: true });
  await expect(semantic).toHaveAttribute('href', /theme\/design-tokens\/colors\/#semantic-tokens$/);
  await semantic.click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/colors\/#semantic-tokens$/);
  await expect(main.getByRole('heading', { name: 'Semantic tokens', exact: true })).toBeVisible();
  await expect(main.locator('#semantic-tokens')).toHaveCount(1);

  await page.goto('../../../styled-system/style-props/');
  const fontSizes = main.getByRole('link', { name: 'fontSizes', exact: true }).first();
  await expect(fontSizes).toHaveAttribute('href', /theme\/design-tokens\/fontSizes\/?$/);
  await fontSizes.click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/fontSizes\/$/);
  await expect(main.getByRole('heading', { name: 'fontSizes', level: 1, exact: true })).toBeVisible();
});

for (const [name, route] of [['tokens', './'], ['guide', '../../media-queries/']]) {
  test(`records the ${name} page and Theme navigation`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await captureColorModes(page, 'theme-routes', name, async (colorMode) => {
      const root = page.locator('html');
      await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
      if (await root.getAttribute('data-color-scheme') !== colorMode) {
        await page.locator('[title="Toggle color mode"]').click();
      }
      await expect(root).toHaveAttribute('data-color-scheme', colorMode);
      const tokensHeading = page.locator('#sidenav').getByText('DESIGN TOKENS', { exact: true });
      await tokensHeading.scrollIntoViewIfNeeded();
      await expect(tokensHeading).toBeInViewport();
      await expect(page.locator('#main').getByRole('heading', { name: name === 'tokens' ? 'breakpoints' : 'Media queries', level: 1, exact: true })).toBeInViewport();
    });
  });
}

test('does not serve or forward retired routes', async ({ browser, page, request }) => {
  const route = (path) => new URL(path, page.url()).href;
  await page.goto('./');
  const retired = [...slugs, 'not-a-design-token'];
  for (const slug of retired) {
    const url = route(`../../${slug}/?view=test`);
    const result = await request.get(url, { maxRedirects: 0 });
    expect(result.status(), url).toBe(404);
    expect(result.headers().location).toBeUndefined();
    expect(await result.text()).not.toMatch(/http-equiv="refresh"/i);
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const url = route('../../colors/?view=test#semantic-tokens');
    const fallback = await context.newPage();
    expect((await fallback.goto(url)).status()).toBe(404);
    await expect(fallback).toHaveURL(url);
    expect((await page.goto(url)).status()).toBe(404);
    await expect(page).toHaveURL(url);
  } finally {
    await context.close();
  }
});

test('opens both guides from Getting started and Theme', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  const sidebar = page.locator('#sidenav');
  const toggle = sidebar.locator('[data-title="Getting started"]');
  if (await toggle.getAttribute('data-expanded') === 'false') {
    await toggle.click();
  }
  const quick = toggle.locator('..');
  const theme = sidebar.locator('[data-title="Theme"]').locator('..');
  const shortcutRoutes = await quick.locator('[data-path]').evaluateAll(links => links.map(link => link.getAttribute('data-path')));
  const icons = shortcutRoutes.indexOf('icons');
  expect(icons).toBeGreaterThanOrEqual(0);
  expect(shortcutRoutes.slice(icons, icons + 4)).toEqual(['icons', 'theme/media-queries', 'theme/container-queries', 'getting-started/mcp']);
  for (const [path, name] of [['media-queries', 'Media queries'], ['container-queries', 'Container queries']]) {
    await quick.locator(`[data-path="theme/${path}"]`).click();
    await expect(page.locator('#main').getByRole('heading', { name, level: 1, exact: true })).toBeVisible();
    await expect(theme.locator(`[data-path="theme/${path}"]`)).toBeVisible();
  }
  for (const [path, name] of [['media-queries', 'Media queries'], ['container-queries', 'Container queries']]) {
    await theme.locator(`[data-path="theme/${path}"]`).click();
    await expect(page.locator('#main').getByRole('heading', { name, level: 1, exact: true })).toBeVisible();
  }
});
