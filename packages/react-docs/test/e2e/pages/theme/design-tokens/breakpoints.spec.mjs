import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../../test/e2e/screenshots.mjs';

const slugs = ['borders', 'breakpoints', 'colors', 'fonts', 'fontSizes', 'fontWeights', 'lineHeights', 'outlines', 'radii', 'shadows', 'sizes', 'space', 'zIndices'];

const expectTokens = async (page) => {
  const tokens = page.locator('#main').getByRole('table').filter({ has: page.getByRole('columnheader', { name: 'Token' }) });
  for (const [name, value] of [['sm', '40rem'], ['md', '48rem'], ['lg', '64rem'], ['xl', '80rem'], ['2xl', '96rem']]) {
    const row = tokens.getByRole('row').filter({ has: page.getByRole('cell', { name, exact: true }) });
    await expect(row.getByRole('cell').nth(1)).toHaveText(value);
  }
};

test('separates Theme guides from all design token destinations', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');

  const sidebar = page.locator('#sidenav');
  const main = page.locator('#main');
  const guide = sidebar.getByRole('link', { name: 'Breakpoints', exact: true });
  const token = sidebar.getByRole('link', { name: 'breakpoints', exact: true });
  const order = sidebar.locator('[data-path="theme"], [data-path="theme/breakpoints"], [data-path="theme/container-queries"], [data-path^="theme/design-tokens/"], :text-is("DESIGN TOKENS")');
  await expect(order).toHaveText(['Getting started', 'Breakpoints', 'Container queries', 'DESIGN TOKENS', ...slugs]);
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
  await main.getByRole('link', { name: 'Breakpoints', exact: true }).click();
  await expect(page).toHaveURL(/\/theme\/breakpoints\/$/);
  await expect(guide).toHaveAttribute('aria-selected', 'true');
  await expect(token).toHaveAttribute('aria-selected', 'false');
  await expect(main.getByRole('heading', { name: 'API', exact: true })).toBeVisible();
  await expect(main.getByRole('columnheader', { name: 'Token' })).toHaveCount(0);
  await main.getByRole('link', { name: 'breakpoint tokens', exact: true }).click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/breakpoints\/$/);
});

test('links to the new token routes from authored and generated references', async ({ page }) => {
  const main = page.locator('#main');
  await page.goto('../../../components/color-style/');
  const semantic = main.getByRole('link', { name: 'semantic tokens', exact: true });
  await expect(semantic).toHaveAttribute('href', /theme\/design-tokens\/colors\/#semantic-tokens$/);
  await semantic.click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/colors\/#semantic-tokens$/);
  await expect(main.getByRole('heading', { name: 'Semantic tokens', exact: true })).toBeVisible();

  await page.goto('../../../styled-system/style-props/');
  const fontSizes = main.getByRole('link', { name: 'fontSizes', exact: true }).first();
  await expect(fontSizes).toHaveAttribute('href', /theme\/design-tokens\/fontSizes\/?$/);
  await fontSizes.click();
  await expect(page).toHaveURL(/\/theme\/design-tokens\/fontSizes\/$/);
  await expect(main.getByRole('heading', { name: 'fontSizes', level: 1, exact: true })).toBeVisible();
});

for (const [name, route] of [['tokens', './'], ['guide', '../../breakpoints/']]) {
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
      await expect(page.locator('#sidenav').getByText('DESIGN TOKENS', { exact: true })).toBeInViewport();
      await expect(page.locator('#main').getByRole('heading', { name: name === 'tokens' ? 'breakpoints' : 'Breakpoints', level: 1, exact: true })).toBeInViewport();
    });
  });
}
