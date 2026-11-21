import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { build, transformWithEsbuild } from 'vite';
import { pixelBreakpoints } from '../../../../pages/theme/breakpoints/pixel-breakpoints.mjs';
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
          containerQueries('sidebar').gte('18.75rem'),
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

  test('keeps the gallery threshold in rem under a pixel theme', async ({ page }) => {
    const entry = 'virtual:pixel-gallery';
    const gallery = fileURLToPath(new URL('../../../../pages/theme/container-queries/usage.js', import.meta.url));
    const { output } = await build({
      configFile: false,
      root: fileURLToPath(new URL('../../../../', import.meta.url)),
      logLevel: 'error',
      plugins: [{
        name: 'pixel-gallery-fixture',
        resolveId(id) {
          if (id === entry) {
            return `\0${entry}`;
          }
        },
        load(id) {
          if (id === `\0${entry}`) {
            return `
              import { createElement } from 'react';
              import { createRoot } from 'react-dom/client';
              import { createTheme, TonicProvider } from '@tonic-ui/react';
              import Gallery from ${JSON.stringify(gallery)};
              const theme = createTheme({ breakpoints: ${JSON.stringify(pixelBreakpoints)} });
              createRoot(document.getElementById('root')).render(
                createElement(TonicProvider, { theme }, createElement(Gallery))
              );
            `;
          }
        },
        transform(code, id) {
          if (id === gallery) {
            return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
          }
        },
      }],
      build: { write: false, rollupOptions: { input: entry, output: { format: 'iife' } } },
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.setContent('<div id="root"></div>');
    await page.addScriptTag({ content: output.find(chunk => chunk.type === 'chunk').code });
    const narrow = page.getByTestId('gallery-grid-192');
    const wide = page.getByTestId('gallery-grid-384');
    await expectWidth(narrow, 192);
    await expectWidth(wide, 384);
    await expect(narrow).toHaveCSS('grid-template-columns', /^\d+px$/);
    await expect(wide).toHaveCSS('grid-template-columns', /^(?:[\d.]+px ){2}[\d.]+px$/);

    // A fixed 224px query would still match the 384px gallery.
    await page.locator('html').evaluate(root => { root.style.fontSize = '32px'; });
    await expectWidth(wide, 384);
    await expect(wide).toHaveCSS('grid-template-columns', /^384px$/);
  });
});
