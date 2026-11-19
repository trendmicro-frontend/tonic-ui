import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';

const HELPERS = ['up-sm', 'down-sm', 'only-md', 'not-md', 'between-sm-md'];
const RANGES = ['xs', 'sm', 'md', 'lg', 'xl'];
const CASES = [
  { width: 200, range: 'xs', active: ['down-sm', 'not-md'] },
  { width: 599, range: 'xs', active: ['down-sm', 'not-md'] },
  { width: 600, range: 'sm', active: ['up-sm', 'not-md', 'between-sm-md'] },
  { width: 899, range: 'sm', active: ['up-sm', 'not-md', 'between-sm-md'] },
  { width: 900, range: 'md', active: ['up-sm', 'only-md'] },
  { width: 1199, range: 'md', active: ['up-sm', 'only-md'] },
  { width: 1200, range: 'lg', active: ['up-sm', 'not-md'] },
  { width: 1535, range: 'lg', active: ['up-sm', 'not-md'] },
  { width: 1536, range: 'xl', active: ['up-sm', 'not-md'] },
];

const expectBreakpointState = async (page, { width, active, range }) => {
  const main = page.locator('#main');
  for (const helper of HELPERS) {
    const box = main.getByTestId(`breakpoint-${helper}`);
    if (active.includes(helper)) {
      await expect(box, `${helper} at ${width}px`).toBeVisible();
    } else {
      await expect(box, `${helper} at ${width}px`).toBeHidden();
    }
  }
  for (const key of RANGES) {
    const box = main.getByTestId(`breakpoint-range-${key}`);
    if (key === range) {
      await expect(box, `${key} range at ${width}px`).toBeVisible();
    } else {
      await expect(box, `${key} range at ${width}px`).toBeHidden();
    }
  }
};

test.describe('theme breakpoints', { tag: ['@docs', '@media', '@boundary'] }, () => {
  test('updates the examples at each viewport boundary without reloading', async ({ page }) => {
    await page.goto('./');

    for (const scenario of CASES) {
      await page.setViewportSize({ width: scenario.width, height: 900 });
      await expectBreakpointState(page, scenario);
    }

    const composed = page.getByTestId('breakpoint-composed-sx');
    await composed.scrollIntoViewIfNeeded();
    for (const [width, ratio] of [[599, 0.5], [600, 1]]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => composed.evaluate(element => {
        return element.getBoundingClientRect().width / element.parentElement.getBoundingClientRect().width;
      })).toBeCloseTo(ratio, 2);
    }

    for (const [width, color, regularRatio] of [[599, 'rgb(0, 0, 255)', 0.5], [600, 'rgb(255, 0, 0)', 1]]) {
      await page.setViewportSize({ width, height: 900 });
      for (const [id, ratio] of [['breakpoint-explicit-sx', regularRatio], ['breakpoint-specificity-override', 0.5]]) {
        const example = page.getByTestId(id);
        await expect(example).toHaveCSS('color', color);
        await expect.poll(() => example.evaluate(element => {
          return element.getBoundingClientRect().width / element.parentElement.getBoundingClientRect().width;
        })).toBeCloseTo(ratio, 2);
      }
    }
  });

  test('records the examples in both color modes', async ({ page }) => {
    await page.goto('./');

    for (const width of [900, 1200]) {
      const scenario = CASES.find((entry) => entry.width === width);
      await captureColorModes(page, 'breakpoints', `helpers-${width}`, async (colorMode) => {
        await page.setViewportSize({ width, height: 900 });
        const root = page.locator('html');
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        if (width === 900) {
          await expect.poll(() => page.locator('#sidenav').evaluate(element => {
            const style = getComputedStyle(element);
            const borders = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            return element.getBoundingClientRect().width - borders;
          })).toBe(0);
        }
        await expectBreakpointState(page, scenario);

        const main = page.locator('#main');
        const range = main.getByTestId(`breakpoint-range-${scenario.range}`);
        const helper = main.getByTestId(`breakpoint-${width === 900 ? 'only-md' : 'not-md'}`);
        await helper.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(range).toBeInViewport();
        await expect(helper).toBeInViewport();
        const header = await page.locator('header').boundingBox();
        const rangeBox = await range.boundingBox();
        expect(rangeBox.y).toBeGreaterThanOrEqual(header.y + header.height);
      });
    }
  });
});
