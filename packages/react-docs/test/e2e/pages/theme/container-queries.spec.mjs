import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';

// Chromium's inclusive comparisons can match one layout unit (1/64px) early.
// Use two units below the lower edges to test fractional non-matches.
const CASES = [
  { width: 299, direction: 'column', outer: false, sm: false },
  { width: 299.96875, direction: 'column', outer: false, sm: false },
  { width: 300, direction: 'row', outer: true, sm: false },
  { width: 300.015625, direction: 'row', outer: true, sm: false },
  { width: 639.96875, direction: 'row', outer: true, sm: false },
  { width: 640, direction: 'row', outer: true, sm: true },
  { width: 640.015625, direction: 'row', outer: true, sm: true },
  { width: 767.984375, direction: 'row', outer: true, sm: true },
  { width: 768, direction: 'row', outer: true, sm: false },
  { width: 768.015625, direction: 'row', outer: true, sm: false },
];

const expectWidth = async (locator, width) => {
  await expect.poll(async () => {
    const bounds = await locator.boundingBox();
    return bounds ? Math.abs(bounds.width - width) : Infinity;
  }).toBeLessThanOrEqual(0.001);
};

const expectVisible = async (locator, visible) => {
  if (visible) {
    await expect(locator).toBeVisible();
  } else {
    await expect(locator).toBeHidden();
  }
};

test.describe('theme container queries', { tag: ['@docs', '@boundary', '@geometry'] }, () => {
  test('matches the container rather than the viewport or nearer named card', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await page.goto('./');

    const main = page.locator('#main');
    const input = main.getByRole('spinbutton', { name: 'Container width (px)' });
    const sidebar = main.getByTestId('query-sidebar');
    const cardContainer = main.getByTestId('query-card-container');
    const card = main.getByTestId('query-card');
    const outer = main.getByTestId('query-unnamed-outer');
    const inner = main.getByTestId('query-unnamed');
    const sm = main.getByTestId('query-only-sm');
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(viewportWidth).toBe(1920);
    await expect(page.locator('html')).toHaveCSS('font-size', '16px');
    await expect(outer).toHaveCount(1);
    await expect(inner).toHaveCount(1);
    await expect(sm).toHaveCount(1);

    for (const scenario of CASES) {
      await input.fill(String(scenario.width));
      await expectWidth(sidebar, scenario.width);
      await expectWidth(cardContainer, 200);
      await expect.poll(() => page.evaluate(() => window.innerWidth)).toBe(viewportWidth);
      await expect(card).toHaveCSS('flex-direction', scenario.direction);
      await expectVisible(outer, scenario.outer);
      await expect(inner).toBeHidden();
      await expectVisible(sm, scenario.sm);
    }
  });

  test('retains entered text without applying empty or out-of-range widths', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await page.goto('./');

    const main = page.locator('#main');
    const input = main.getByRole('spinbutton', { name: 'Container width (px)' });
    const sidebar = main.getByTestId('query-sidebar');
    await expect(input).toHaveAttribute('step', 'any');
    await expect(input).toHaveAttribute('min', '200');
    await expect(input).toHaveAttribute('max', '900');
    await expect(input).toHaveValue('299');
    await expectWidth(sidebar, 299);

    for (const [value, appliedWidth] of [
      ['200.00', 200],
      ['900', 900],
      ['900.015625', 900],
      ['199', 900],
      ['', 900],
      ['300.015625', 300.015625],
    ]) {
      await input.fill(value);
      await expect(input).toHaveValue(value);
      await expectWidth(sidebar, appliedWidth);
    }
  });

  test('records the narrow and wide layouts in both color modes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await page.goto('./');

    const main = page.locator('#main');
    const demo = main.getByTestId('container-query-demo');
    const input = main.getByRole('spinbutton', { name: 'Container width (px)' });
    const sidebar = main.getByTestId('query-sidebar');
    const card = main.getByTestId('query-card');
    const first = main.getByTestId('query-card-first');
    const second = main.getByTestId('query-card-second');
    const root = page.locator('html');

    for (const [name, width, direction] of [['narrow', 299, 'column'], ['wide', 640, 'row']]) {
      await captureColorModes(page, 'container-queries', name, async (colorMode) => {
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        await input.fill(String(width));
        await expectWidth(sidebar, width);
        await expect(card).toHaveCSS('flex-direction', direction);
        await expect.poll(async () => {
          const firstBox = await first.boundingBox();
          const secondBox = await second.boundingBox();
          if (!firstBox || !secondBox) {
            return false;
          }
          return direction === 'row'
            ? secondBox.x >= firstBox.x + firstBox.width - 0.001
            : secondBox.y >= firstBox.y + firstBox.height - 0.001;
        }).toBe(true);
        await demo.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(input).toBeInViewport();
        await expect(card).toBeInViewport();
        const inputBox = await input.boundingBox();
        const cardBox = await card.boundingBox();
        expect(inputBox.y + inputBox.height).toBeLessThanOrEqual(cardBox.y);
      });
    }
  });
});
