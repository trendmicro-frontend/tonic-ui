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

const DEMO_CASES = [
  ['narrow', 299],
  ['row-start', 300],
  ['wide', 640],
  ['sm-end', 768],
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

const expectQueryState = async (main, { direction, outer, sm, width }) => {
  await expect(main.getByTestId('query-card'), `layout at ${width}px`).toHaveCSS('flex-direction', direction);
  await expectVisible(main.getByTestId('query-unnamed-outer'), outer);
  await expect(main.getByTestId('query-unnamed')).toBeHidden();
  await expectVisible(main.getByTestId('query-lt-300'), !outer);
  await expectVisible(main.getByTestId('query-between-300-and-sm'), outer && width < 640);
  await expectVisible(main.getByTestId('query-only-sm'), sm);
};

test.describe('theme container queries', { tag: ['@docs', '@boundary', '@geometry'] }, () => {
  for (const [viewport, width] of [['desktop', 1440], ['mobile', 320]]) {
    test(`shows both profile card layouts at a ${width}px viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('./');

      const main = page.locator('#main');
      const narrow = main.getByTestId('profile-card-144');
      const wide = main.getByTestId('profile-card-240');
      const root = page.locator('html');

      await captureColorModes(page, 'container-queries', `usage-profile-${viewport}`, async (colorMode) => {
        // The color mode control is offscreen in the 320px header.
        await page.setViewportSize({ width: 1440, height: 900 });
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        await page.setViewportSize({ width, height: 900 });
        await expectWidth(narrow, 144);
        await expectWidth(wide, 240);
        await expect(narrow).toHaveCSS('flex-direction', 'column');
        await expect(wide).toHaveCSS('flex-direction', 'row');
        await narrow.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(narrow.getByText('Maya Chen')).toBeInViewport();
        await expect(wide.getByText('Maya Chen')).toBeInViewport();
      });
    });
  }

  test('matches the container rather than the viewport or nearer named card', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await page.goto('./');

    const main = page.locator('#main');
    const input = main.getByRole('spinbutton', { name: 'Container width (px)' });
    const sidebar = main.getByTestId('query-sidebar');
    const cardContainer = main.getByTestId('query-card-container');
    const indicators = ['query-unnamed-outer', 'query-unnamed', 'query-lt-300', 'query-between-300-and-sm', 'query-only-sm'];
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(viewportWidth).toBe(1920);
    await expect(page.locator('html')).toHaveCSS('font-size', '16px');
    for (const id of indicators) {
      await expect(main.getByTestId(id)).toHaveCount(1);
    }

    for (const scenario of [...CASES, CASES[0]]) {
      await input.fill(String(scenario.width));
      await expectWidth(sidebar, scenario.width);
      await expectWidth(cardContainer, 200);
      await expect.poll(() => page.evaluate(() => window.innerWidth)).toBe(viewportWidth);
      await expectQueryState(main, scenario);
    }

    // Keep the container fixed while the viewport crosses the same thresholds.
    await input.fill('640');
    await page.setViewportSize({ width: 550, height: 1000 });
    await expectWidth(sidebar, 640);
    await expectQueryState(main, CASES.find(({ width }) => width === 640));
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

  test('records each query state in both color modes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 });
    await page.goto('./');

    const main = page.locator('#main');
    const demo = main.getByTestId('container-query-demo');
    const input = main.getByRole('spinbutton', { name: 'Container width (px)' });
    const presets = main.getByRole('group', { name: 'Width presets' });
    const sidebar = main.getByTestId('query-sidebar');
    const card = main.getByTestId('query-card');
    const first = main.getByTestId('query-card-first');
    const second = main.getByTestId('query-card-second');
    const root = page.locator('html');
    await expect(card.getByText('Docs build', { exact: true })).toBeVisible();

    for (const [name, width] of DEMO_CASES) {
      const scenario = CASES.find(entry => entry.width === width);
      await captureColorModes(page, 'container-queries', name, async (colorMode) => {
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        const preset = presets.getByRole('button', { name: `${width} px`, exact: true });
        await preset.click();
        await expect(preset).toHaveAttribute('aria-pressed', 'true');
        await expect(presets.getByRole('button', { pressed: true })).toHaveCount(1);
        await expect(input).toHaveValue(String(width));
        await expectWidth(sidebar, width);
        await expectQueryState(main, scenario);
        await expect.poll(async () => {
          const firstBox = await first.boundingBox();
          const secondBox = await second.boundingBox();
          if (!firstBox || !secondBox) {
            return false;
          }
          return scenario.direction === 'row'
            ? secondBox.x >= firstBox.x + firstBox.width - 0.001
            : secondBox.y >= firstBox.y + firstBox.height - 0.001;
        }).toBe(true);
        await demo.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(input).toBeInViewport();
        await expect(card).toBeInViewport();
        const inputBox = await input.boundingBox();
        const cardBox = await card.boundingBox();
        expect(inputBox.y + inputBox.height).toBeLessThanOrEqual(cardBox.y);
        await expect.poll(() => presets.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
      });
    }
  });
});
