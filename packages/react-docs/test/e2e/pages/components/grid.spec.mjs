import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';

test('applies gap, rowGap, and columnGap in the Grid demos', { tag: ['@docs', '@grid'] }, async ({ page }) => {
  await page.goto('./');
  const main = page.getByRole('main');
  const gap = main.getByTestId('grid-gap-example');
  const rowGap = main.getByTestId('grid-row-gap-example');
  const columnGap = main.getByTestId('grid-column-gap-example');

  for (const [grid, value, row, column] of [
    [gap, '10px 20px', '10px', '20px'],
    [rowGap, '20px', '20px', 'normal'],
    [columnGap, '20px', 'normal', '20px'],
  ]) {
    await grid.locator('..').getByRole('button', { name: value, exact: true }).click();
    await expect(grid).toHaveCSS('row-gap', row);
    await expect(grid).toHaveCSS('column-gap', column);
  }

  await captureColorModes(page, 'grid', 'gap', async (colorMode) => {
    const root = page.locator('html');
    await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
    if (await root.getAttribute('data-color-scheme') !== colorMode) {
      await page.getByTitle('Toggle color mode').click();
    }
    await expect(root).toHaveAttribute('data-color-scheme', colorMode);
    await gap.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(gap).toBeInViewport();
  });
});
