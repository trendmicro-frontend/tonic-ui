import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { build, transformWithEsbuild } from 'vite';
import { pixelBreakpoints } from '../../../../pages/theme/breakpoints/pixel-breakpoints.mjs';
import { breakpoints as defaultBreakpoints } from '../../../../utils/default-breakpoints.js';
import { convertBreakpointWidth } from '../../../../utils/convert-breakpoint-width.mjs';
import { captureColorModes } from '../../../../../../test/e2e/screenshots.mjs';

const HELPERS = ['gte-sm', 'lt-sm', 'only-md', 'between-sm-md'];
const defaultPx = (key) => convertBreakpointWidth(defaultBreakpoints.values[key], defaultBreakpoints.unit, 'px');
const defaultLg = defaultPx('lg');
const { sm: exampleSm, md: exampleMd, lg: exampleLg } = pixelBreakpoints.values;
const boundaries = [exampleSm, exampleMd, exampleLg];
const CASES = [200, ...new Set(boundaries.flatMap(width => [Math.ceil(width) - 1, Math.ceil(width)]))]
  .sort((a, b) => a - b)
  .map(width => ({
    width,
    active: HELPERS.filter(id => ({
      'gte-sm': width >= exampleSm,
      'lt-sm': width < exampleSm,
      'only-md': width >= exampleMd && width < exampleLg,
      'between-sm-md': width >= exampleSm && width < exampleMd,
    })[id]),
  }));

const expectBreakpointState = async (page, { width, active }) => {
  const main = page.locator('#main');
  for (const helper of HELPERS) {
    const box = main.getByTestId(`breakpoint-${helper}`);
    if (active.includes(helper)) {
      await expect(box, `${helper} at ${width}px`).toBeVisible();
    } else {
      await expect(box, `${helper} at ${width}px`).toBeHidden();
    }
  }
  const queries = main.getByRole('list', { name: 'Media query matches' });
  await expect(queries.getByRole('listitem')).toHaveCount(HELPERS.length);
  await expect(queries.getByText('No match', { exact: true }).filter({ visible: true })).toHaveCount(HELPERS.length - active.length);
};

test.describe('theme breakpoints', { tag: ['@docs', '@media', '@boundary'] }, () => {
  test('matches the documented rule composition results', async ({ page, context }) => {
    const guide = new URL('../../../../pages/theme/breakpoints/index.page.mdx', import.meta.url);
    const source = (await readFile(guide, 'utf8')).split('\n## Rule composition\n')[1].split('\n## API\n')[0];
    const samples = [...source.matchAll(/```jsx\n([\s\S]*?)\n```/g)].map(([, snippet]) => snippet);
    await page.goto('./');
    const tables = page.locator('#main').getByRole('table').filter({
      has: page.getByRole('columnheader', { name: 'Viewport width', exact: true }),
    });
    expect(samples).toHaveLength(3);
    await expect(tables).toHaveCount(samples.length);
    const { sm, md } = pixelBreakpoints.values;
    for (const table of await tables.all()) {
      await expect(table.locator('tbody td:first-child')).toHaveText([
        `Below sm< ${sm}px`,
        `From sm to below md${sm}px to under ${md}px`,
        `md and above≥ ${md}px`,
      ]);
    }

    // Compile the documentation snippets verbatim without adding live demos to the guide.
    const entry = 'virtual:breakpoint-composition.jsx';
    const { output } = await build({
      configFile: false,
      root: fileURLToPath(new URL('../../../../', import.meta.url)),
      logLevel: 'error',
      plugins: [{
        name: 'breakpoint-composition-fixture',
        resolveId(id) {
          if (id === entry) {
            return `\0${id}`;
          }
        },
        load(id) {
          if (id === `\0${entry}`) {
            return transformWithEsbuild(`
              import { createRoot } from 'react-dom/client';
              import { Box, createTheme, TonicProvider, useTheme } from '@tonic-ui/react';
              const theme = createTheme({ breakpoints: ${JSON.stringify(pixelBreakpoints)} });
              function Samples() {
                const { breakpoints } = useTheme();
                return <Box sx={{ color: '#123456' }}>${samples.map((sample, index) =>
                  `<Box data-testid="sample-${index}" sx={{ width: '200px' }}>${sample}</Box>`).join('')}</Box>;
              }
              createRoot(document.getElementById('root')).render(
                <TonicProvider theme={theme} useCSSVariables colorMode={{ defaultValue: 'light' }}><Samples /></TonicProvider>
              );
            `, entry, { loader: 'jsx', jsx: 'automatic' });
          }
        },
      }],
      build: { write: false, rollupOptions: { input: entry, output: { format: 'iife' } } },
    });
    const fixture = await context.newPage();
    await fixture.setContent('<div id="root"></div>');
    await fixture.addScriptTag({ content: output.find(chunk => chunk.type === 'chunk').code });
    for (const [width, row] of [[sm - 1, 0], [sm, 1], [md - 1, 1], [md, 2], [md + 1, 2]]) {
      await fixture.setViewportSize({ width, height: 900 });
      for (const [index, table] of (await tables.all()).entries()) {
        const declarations = await table.locator('tbody tr').nth(row).locator('td:last-child code').allTextContents();
        expect(declarations).toEqual([expect.stringMatching(/^color: .+;$/), expect.stringMatching(/^width: .+;$/)]);
        const sample = fixture.getByTestId(`sample-${index}`);
        const expected = await sample.evaluate((parent, styles) => {
          const reference = document.createElement('div');
          reference.style.cssText = styles.join(' ');
          parent.appendChild(reference);
          const { width, color } = getComputedStyle(reference);
          reference.remove();
          return { width, color };
        }, declarations);
        await expect(sample.locator(':scope > div')).toHaveCSS('width', expected.width);
        await expect(sample.locator(':scope > div')).toHaveCSS('color', expected.color);
      }
    }
  });

  test('includes the start and excludes the end of the documented pixel range', async ({ page }) => {
    await page.goto('./');
    const example = page.locator('#main pre').filter({ hasText: "breakpoints.between('700px', '960px')" });
    const condition = '(700px <= width < 960px)';
    await expect(example).toContainText(`@media ${condition}`);
    const zeroExample = page.locator('#main pre').filter({ hasText: 'breakpoints.gte(0)' });
    await expect(zeroExample).toContainText('@media (width >= 0)');
    expect(await page.evaluate(() => window.matchMedia('(width >= 0)').matches)).toBe(true);

    for (const [width, matches] of [[699, false], [700, true], [959, true], [960, false]]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(query => window.matchMedia(query).matches, condition), `at ${width}px`).toBe(matches);
    }
  });

  test('updates the examples at each viewport boundary without reloading', async ({ page }) => {
    await page.goto('./');

    const main = page.locator('#main');
    for (const [helper, args] of [['gte', 'start'], ['lt', 'end'], ['between', 'start, end'], ['only', 'name']]) {
      await page.goto('./');
      await main.getByRole('link', { name: `theme.breakpoints.${helper}(${args})`, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#themebreakpoints${helper}$`));
      await expect(main.getByRole('heading', { name: `theme.breakpoints.${helper}`, exact: true })).toBeInViewport();
    }

    const queries = page.getByRole('list', { name: 'Media query matches' });
    for (const query of [
      `@media (width >= ${exampleSm}px)`,
      `@media (width < ${exampleSm}px)`,
      `@media (${exampleSm}px <= width < ${exampleMd}px)`,
      `@media (${exampleMd}px <= width < ${exampleLg}px)`,
    ]) {
      await expect(queries.getByText(query, { exact: true })).toBeVisible();
    }

    for (const scenario of CASES) {
      await page.setViewportSize({ width: scenario.width, height: 900 });
      await expectBreakpointState(page, scenario);
    }
  });

  test('aligns the docs shell and header at the lg boundary', async ({ page }) => {
    const belowLg = Math.ceil(defaultLg) - 1;
    await page.setViewportSize({ width: belowLg, height: 900 });
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
    await expect.poll(() => main.evaluate(element => element.getBoundingClientRect().width)).toBe(belowLg);

    await page.setViewportSize({ width: Math.ceil(defaultLg), height: 900 });
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
      const { width } = scenario;
      await captureColorModes(page, 'breakpoints', `helpers-${width}`, async (colorMode) => {
        await page.setViewportSize({ width, height: 900 });
        const root = page.locator('html');
        await expect(root).toHaveAttribute('data-color-scheme', /^(light|dark)$/);
        if (await root.getAttribute('data-color-scheme') !== colorMode) {
          await page.locator('[title="Toggle color mode"]').click();
        }
        await expect(root).toHaveAttribute('data-color-scheme', colorMode);
        if (width < defaultLg) {
          await expect.poll(() => page.locator('#sidenav').evaluate(element => {
            const style = getComputedStyle(element);
            const borders = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            return element.getBoundingClientRect().width - borders;
          })).toBe(0);
        }
        await expectBreakpointState(page, scenario);

        const main = page.locator('#main');
        const helper = main.getByTestId(`breakpoint-${scenario.active.at(-1)}`);
        const examples = main.getByRole('region', { name: 'Media query examples' });
        await examples.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(examples).toBeInViewport({ ratio: 1 });
        await expect(helper).toBeInViewport();
        const header = await page.locator('header').boundingBox();
        const helperBox = await helper.boundingBox();
        expect(helperBox.y).toBeGreaterThanOrEqual(header.y + header.height);
      });
    }

    await captureColorModes(page, 'breakpoints', 'code-samples-1024', async (colorMode) => {
      await page.setViewportSize({ width: 1024, height: 900 });
      const root = page.locator('html');
      if (await root.getAttribute('data-color-scheme') !== colorMode) {
        await page.locator('[title="Toggle color mode"]').click();
      }
      await expect(root).toHaveAttribute('data-color-scheme', colorMode);
      const composition = page.getByRole('heading', { name: 'Compose rules for the same query', level: 3, exact: true });
      await composition.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await expect(composition).toBeInViewport();
    });

    await captureColorModes(page, 'breakpoints', 'css-media-queries', async (colorMode) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      const root = page.locator('html');
      if (await root.getAttribute('data-color-scheme') !== colorMode) {
        await page.locator('[title="Toggle color mode"]').click();
      }
      await expect(root).toHaveAttribute('data-color-scheme', colorMode);
      const heading = page.locator('#main').getByRole('heading', { name: 'CSS media queries', level: 2 });
      await heading.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await expect(page.getByRole('link', { name: 'theme.breakpoints.gte(start)', exact: true })).toBeInViewport();
      const code = page.getByRole('link', { name: 'theme.breakpoints.gte(start)', exact: true }).locator('code');
      await expect(code).toHaveCSS('padding-block', '2px');
      await expect(code).toHaveCSS('padding-inline', '4px');
      await expect(code).toHaveCSS('border-top-left-radius', '6px');
    });

    await captureColorModes(page, 'breakpoints', 'custom-breakpoints', async (colorMode) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      const root = page.locator('html');
      if (await root.getAttribute('data-color-scheme') !== colorMode) {
        await page.locator('[title="Toggle color mode"]').click();
      }
      await expect(root).toHaveAttribute('data-color-scheme', colorMode);
      const main = page.locator('#main');
      await main.getByRole('link', { name: 'custom breakpoints', exact: true }).click();
      await expect(page).toHaveURL(/#custom-breakpoints$/);
      const heading = main.getByRole('heading', { name: 'Custom breakpoints', level: 2, exact: true });
      await heading.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await expect(heading).toBeInViewport();
      const code = main.locator('pre');
      for (const unit of [defaultBreakpoints.unit, 'px']) {
        const example = code.filter({ hasText: new RegExp(`'2xl': [\\d.]+,\\s*},\\s*unit: '${unit}'`) });
        await expect(example).toBeVisible();
        expect((await example.textContent()).match(/\bconst theme\b/g)).toHaveLength(1);
        for (const key of defaultBreakpoints.keys) {
          const value = convertBreakpointWidth(defaultBreakpoints.values[key], defaultBreakpoints.unit, unit);
          await expect(example).toContainText(`${key === '2xl' ? "'2xl'" : key}: ${value},`);
        }
      }
      const custom = code.filter({ hasText: 'mobile: 0' });
      await expect(custom).toContainText("theme.breakpoints.only('tablet')");
      await expect(custom).toContainText('@media (640px <= width < 1024px)');
    });
  });
});
