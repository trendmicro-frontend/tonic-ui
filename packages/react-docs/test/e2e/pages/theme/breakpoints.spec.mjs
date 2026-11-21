import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';

const HELPERS = ['gte-sm', 'lt-sm', 'only-md', 'between-sm-md'];
const RANGES = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];
// rem media queries use the browser's initial font size (16px in this suite).
const CASES = [
  { width: 200, range: 'base', active: ['lt-sm'] },
  { width: 639, range: 'base', active: ['lt-sm'] },
  { width: 640, range: 'sm', active: ['gte-sm', 'between-sm-md'] },
  { width: 767, range: 'sm', active: ['gte-sm', 'between-sm-md'] },
  { width: 768, range: 'md', active: ['gte-sm', 'only-md'] },
  { width: 1023, range: 'md', active: ['gte-sm', 'only-md'] },
  { width: 1024, range: 'lg', active: ['gte-sm'] },
  { width: 1279, range: 'lg', active: ['gte-sm'] },
  { width: 1280, range: 'xl', active: ['gte-sm'] },
  { width: 1535, range: 'xl', active: ['gte-sm'] },
  { width: 1536, range: '2xl', active: ['gte-sm'] },
];

const tokenColor = (page, token) => page.evaluate((name) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--tonic-colors-text-${name}`).trim();
  const probe = document.createElement('span');
  probe.style.color = value;
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}, token);

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
    for (const [width, ratio] of [[639, 1], [640, 0.5], [767, 0.5], [768, 1]]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => composed.evaluate(element => {
        return element.getBoundingClientRect().width / element.parentElement.getBoundingClientRect().width;
      })).toBeCloseTo(ratio, 2);
    }

    for (const [width, token, regularRatio] of [[640, 'secondary', 0.5], [767, 'secondary', 0.5], [768, 'primary', 1]]) {
      const color = await tokenColor(page, token);
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

  test('aligns the docs shell and header at the lg boundary', async ({ page }) => {
    await page.setViewportSize({ width: 1023, height: 900 });
    await page.goto('./');

    const sidebar = page.locator('#sidenav');
    const main = page.locator('#main');
    const toc = page.locator('#toc');
    const logo = page.locator('[data-track="Header|click_landing_page"]');
    const search = page.locator('[data-track="Search|open_search_modal"]');

    await expect(toc).toBeHidden();
    await expect(logo).toBeHidden();
    await expect.poll(() => sidebar.evaluate(element => {
      const style = getComputedStyle(element);
      const borders = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return element.getBoundingClientRect().width - borders;
    })).toBe(0);
    await expect.poll(() => main.evaluate(element => element.getBoundingClientRect().width)).toBe(1023);

    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(toc).toBeVisible();
    await expect(logo).toBeVisible();
    await expect.poll(() => sidebar.evaluate(element => element.getBoundingClientRect().width)).toBe(240);
    const [sidebarBox, mainBox, tocBox, logoBox, searchBox, githubBox] = await Promise.all([
      sidebar.boundingBox(),
      main.boundingBox(),
      toc.boundingBox(),
      logo.boundingBox(),
      search.boundingBox(),
      page.locator('header [title="GitHub repository"]').boundingBox(),
    ]);
    expect(mainBox.x).toBeCloseTo(sidebarBox.x + sidebarBox.width, 0);
    expect(mainBox.x + mainBox.width).toBeCloseTo(tocBox.x, 0);
    expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(searchBox.x);
    expect(githubBox.x + githubBox.width).toBeLessThanOrEqual(1024);
  });

  test('records the examples in both color modes', async ({ page }) => {
    await page.goto('./');

    for (const scenario of CASES.slice(1)) {
      const { width, range: size } = scenario;
      await captureColorModes(page, 'breakpoints', `helpers-${size}-${width}`, async (colorMode) => {
        await page.setViewportSize({ width, height: 900 });
        const root = page.locator('html');
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        await page.setViewportSize({ width: 640, height: 900 });
        const secondary = await tokenColor(page, 'secondary');
        const primary = await tokenColor(page, 'primary');
        expect(secondary).not.toBe(primary);
        for (const id of ['breakpoint-composed-sx', 'breakpoint-explicit-sx', 'breakpoint-specificity-override']) {
          await expect(page.getByTestId(id)).toHaveCSS('color', secondary);
        }
        await page.setViewportSize({ width, height: 900 });
        for (const id of ['breakpoint-composed-sx', 'breakpoint-explicit-sx', 'breakpoint-specificity-override']) {
          await expect(page.getByTestId(id)).toHaveCSS('color', size === 'sm' ? secondary : primary);
        }
        if (width < 1024) {
          await expect.poll(() => page.locator('#sidenav').evaluate(element => {
            const style = getComputedStyle(element);
            const borders = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            return element.getBoundingClientRect().width - borders;
          })).toBe(0);
        }
        await expectBreakpointState(page, scenario);

        const main = page.locator('#main');
        const range = main.getByTestId(`breakpoint-range-${scenario.range}`);
        const helper = main.getByTestId(`breakpoint-${scenario.active.at(-1)}`);
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
