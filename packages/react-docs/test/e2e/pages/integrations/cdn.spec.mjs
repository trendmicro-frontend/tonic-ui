// Documentation page contract: the overview links point at the configuration
// sections, each section carries an entry URL and an import map, and the
// measured-cost panel opens a grouped request list.
// Runs against the real docs server started by playwright.config.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

// packages/react-docs/test/e2e/pages/integrations -> repository root
const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../..');

const PROVIDERS = ['esm.sh', 'jsDelivr', 'esm.sh', 'jsDelivr', 'Self-hosted', 'Self-hosted'];

const CONFIGURATIONS = [
  { title: 'Use esm.sh with ?standalone', id: 'use-esmsh-with-standalone' },
  { title: 'Use jsDelivr with +esm', id: 'use-jsdelivr-with-esm' },
  { title: 'Load dist/standalone through raw.esm.sh', id: 'load-diststandalone-through-rawesmsh' },
  { title: 'Load dist/standalone through jsDelivr', id: 'load-diststandalone-through-jsdelivr' },
  { title: 'Use self-hosted CDN for React and dist/standalone', id: 'use-self-hosted-cdn-for-react-and-diststandalone' },
  { title: "Use your application's bundler", id: 'use-your-applications-bundler' },
];

test.describe('integrations/cdn', { tag: ['@docs', '@integration', '@cdn'] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('every overview link resolves to its configuration section', async ({ page }) => {
    const hrefs = await page.locator('a[href^="#"]').evaluateAll(nodes => (
      nodes.map(node => node.getAttribute('href')).filter(href => href.length > 1)
    ));

    for (const { id, title } of CONFIGURATIONS) {
      expect(hrefs, `no link to #${id}`).toContain(`#${id}`);
      const heading = page.locator(`#${id}`);
      await expect(heading, `missing section #${id}`).toHaveCount(1);
      await expect(heading).toHaveText(title);
    }
  });

  test('clicking an overview link scrolls to that configuration', async ({ page }) => {
    const { id } = CONFIGURATIONS[4];
    await page.getByRole('link', { name: CONFIGURATIONS[4].title, exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    // The docs site scrolls smoothly, so wait for the heading to settle.
    await page.waitForFunction(
      (selector) => {
        const heading = document.querySelector(selector);
        if (!heading) {
          return false;
        }
        const top = heading.getBoundingClientRect().top;
        return top > -20 && top < 400;
      },
      `#${id}`,
      { timeout: 15_000 },
    );
  });

  test('each configuration carries one import map with the library entry', async ({ page }) => {
    const blocks = await page.locator('pre').evaluateAll(nodes => (
      nodes.map(node => node.innerText)
    ));
    const maps = blocks.filter(text => text.includes('importmap'));
    const scriptTags = blocks.filter(text => text.includes('type="module"') && text.includes('src='));
    const bareUrls = blocks.filter(text => /^https?:\/\/\S+$/.test(text.trim()));

    // Five CDN configurations: the entry is the `@tonic-ui/react` key of the map.
    expect(maps).toHaveLength(5);
    maps.forEach(map => expect(map).toContain('@tonic-ui/react'));

    // The bundler configuration loads its built entry instead, and no section
    // keeps a separate entry-URL block.
    expect(scriptTags).toHaveLength(1);
    expect(bareUrls).toHaveLength(0);
  });

  test('mermaid code blocks render diagrams', async ({ page }) => {
    const flowchart = page.locator('svg.pele-flowchart');
    await expect(flowchart).toHaveCount(1);
    await expect(flowchart).toContainText('1. Application loads');
    await expect(flowchart).toContainText('4. Application mounts');

    // The sequence type is loaded on demand, so this also covers `pele/lazy`.
    const sequence = page.locator('svg.pele-sequence');
    await expect(sequence).toHaveCount(1);
    await expect(sequence).toContainText('probe react, react-dom, @tonic-ui/react');
    await expect(sequence).toContainText('fails or times out');
  });

  test('the AI prompt is copyable', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const prompt = page.locator('pre', { hasText: 'Integrate CDN-first loading' }).first();
    await prompt.scrollIntoViewIfNeeded();
    await prompt.locator('xpath=../../button').first().click();

    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('git clone --depth 1');
    expect(text).toContain('examples/cdn-with-local-fallback');
    expect(text).toContain('?__local=react,react-dom,@tonic-ui/react');
  });

  test('requests info opens a grouped popover and filters it', async ({ page }) => {
    await page.getByRole('button', { name: /^Show the \d+ JavaScript requests$/ }).first().click();

    const popover = page.locator('[role="dialog"]').filter({ hasText: /^Requests \(\d+\)/ }).first();
    await expect(popover).toBeVisible();
    await expect(popover.getByRole('button', { name: /^All \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'true');

    await popover.getByRole('button', { name: /^React \(\d+\)$/ }).click();
    await expect(popover.getByRole('button', { name: /^React \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(popover.getByRole('button', { name: /^Emotion \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'false');

    await popover.getByRole('button', { name: /^Emotion \(\d+\)$/ }).click();
    await expect(popover.getByText(/@emotion\//).first()).toBeVisible();
  });

  test('the measurement panel lists the six configurations in page order', async ({ page }) => {
    const body = await page.locator('body').innerText();
    // Start after the panel heading: the same titles also appear in the overview list.
    const panelText = body.slice(body.indexOf('Measurement'));
    const positions = CONFIGURATIONS.map(({ title }) => panelText.indexOf(title));
    positions.forEach((position, index) => {
      expect(position, `missing panel row ${CONFIGURATIONS[index].title}`).toBeGreaterThan(-1);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test('each measurement row shows its provider tag and request counts', async ({ page }) => {
    const rows = page.getByTestId('measurement-row');
    await expect(rows).toHaveCount(CONFIGURATIONS.length);

    // The five CDN rows list request counts per category; the application is
    // an inline script there, so the counts never mention it.
    for (let index = 0; index < CONFIGURATIONS.length - 1; index += 1) {
      const row = rows.nth(index);
      await expect(row).toContainText(
        /React: \d+ \| Emotion: \d+ \| Tonic UI: \d+ \| Others: \d+/,
      );
      await expect(row).not.toContainText('App bundle');
      await expect(row.getByTestId('measurement-provider')).toHaveText(PROVIDERS[index]);
    }

    // The bundler row ships one application chunk, so it has no categories.
    const bundler = rows.last();
    await expect(bundler).toContainText('App bundle');
    await expect(bundler).not.toContainText(/React: \d+/);
  });

  test('the divider and the stat columns line up across measurement rows', async ({ page }) => {
    const offsets = await page.getByTestId('measurement-row').evaluateAll((rows) => (
      rows.map((row) => {
        const stats = row.lastElementChild;
        return Math.round(stats.getBoundingClientRect().left - row.getBoundingClientRect().left);
      })
    ));
    expect(new Set(offsets).size, `stat column offsets: ${offsets.join(', ')}`).toBe(1);
  });

  test('every linked repository file exists', async ({ page }) => {
    const hrefs = await page
      .locator('a[href^="https://github.com/trendmicro-frontend/tonic-ui/"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));

    const checked = new Set();
    for (const href of hrefs) {
      const match = href.match(
        /^https:\/\/github\.com\/trendmicro-frontend\/tonic-ui\/(?:blob|tree)\/main\/(.+?)(?:#.*)?$/,
      );
      if (!match) {
        continue;
      }
      const target = path.join(REPOSITORY_ROOT, decodeURIComponent(match[1]));
      expect(fs.existsSync(target), `missing repository path for ${href}`).toBe(true);
      checked.add(href);
    }
    expect(checked.size).toBeGreaterThan(0);
  });
});
