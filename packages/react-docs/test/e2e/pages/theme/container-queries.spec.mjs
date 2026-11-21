import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';
import { breakpoints, containerQueries } from '../../../../utils/default-breakpoints.js';
import { formatBreakpoint } from '../../../../utils/convert-breakpoint-width.mjs';

const mdPx = Math.ceil(parseFloat(formatBreakpoint(breakpoints, 'md', 'px')));

const expectWidth = async (locator, width) => {
  await expect.poll(async () => {
    const bounds = await locator.boundingBox();
    return bounds ? Math.abs(bounds.width - width) : Infinity;
  }).toBeLessThanOrEqual(0.001);
};

test.describe('theme container queries', { tag: ['@docs', '@boundary', '@geometry'] }, () => {
  for (const [viewport, width] of [['desktop', 1440], ['mobile', 320]]) {
    test(`combines viewport layout and gallery columns at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('./');

      const main = page.locator('#main');
      const narrow = main.getByTestId('gallery-grid-192');
      const wide = main.getByTestId('gallery-grid-384');
      const expectLayout = async (sideBySide) => {
        await expect.poll(async () => {
          const sidebar = await narrow.boundingBox();
          const mainArea = await wide.boundingBox();
          if (!sidebar || !mainArea) {
            return false;
          }
          return sideBySide
            ? mainArea.x >= sidebar.x + sidebar.width && mainArea.y === sidebar.y
            : mainArea.y >= sidebar.y + sidebar.height && mainArea.x === sidebar.x;
        }).toBe(true);
        await expect(narrow).toHaveCSS('grid-template-columns', /^\d+px$/);
        await expect(wide).toHaveCSS('grid-template-columns', /^(?:[\d.]+px ){2}[\d.]+px$/);
      };
      const root = page.locator('html');

      if (viewport === 'desktop') {
        const results = main.getByRole('table').filter({ has: page.getByRole('columnheader', { name: 'Result', exact: true }) });
        await expect(results.locator('tbody td:last-child')).toHaveText([
          containerQueries.gte('sm'),
          containerQueries.lt('md'),
          containerQueries.between('sm', 'lg'),
          containerQueries.only('md'),
          containerQueries('sidebar').gte(18.75),
        ]);
        await page.setViewportSize({ width: mdPx - 1, height: 900 });
        await expectLayout(false);
        await page.setViewportSize({ width: mdPx, height: 900 });
        await expectLayout(true);
      }

      await captureColorModes(page, 'container-queries', `usage-gallery-${viewport}`, async (colorMode) => {
        // The color mode control is offscreen in the 320px header.
        await page.setViewportSize({ width: 1440, height: 900 });
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        await page.setViewportSize({ width, height: 900 });
        await expectWidth(narrow, 192);
        if (viewport === 'desktop') {
          await expectWidth(wide, 384);
        } else {
          await expect.poll(async () => (await wide.boundingBox()).width).toBeLessThanOrEqual(width);
        }
        await expectLayout(viewport === 'desktop');
        await expect(narrow.getByRole('img')).toHaveCount(6);
        await expect(wide.getByRole('img')).toHaveCount(6);
        await narrow.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(narrow.getByRole('img', { name: 'Alpine lake' })).toBeInViewport();
        await expect(wide.getByRole('img', { name: 'Alpine lake' })).toBeInViewport();
      });
    });
  }
});
