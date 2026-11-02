// Documentation page contract: the overview links point at the configuration
// sections, each section carries an entry URL and an import map, and the
// measured-cost panel opens a grouped request list.
// Runs against the real docs server started by playwright.config.mjs.

import { test, expect } from '@playwright/test';

const CONFIGURATIONS = [
  { title: 'Use esm.sh with ?standalone', id: 'use-esmsh-with-standalone' },
  { title: 'Use jsDelivr with +esm', id: 'use-jsdelivr-with-esm' },
  { title: 'Load dist/standalone through raw.esm.sh', id: 'load-diststandalone-through-rawesmsh' },
  { title: 'Load dist/standalone through jsDelivr', id: 'load-diststandalone-through-jsdelivr' },
  { title: 'Use self-hosted CDN for React and dist/standalone', id: 'use-self-hosted-cdn-for-react-and-diststandalone' },
  { title: "Use your application's bundler", id: 'use-your-applications-bundler' },
];

test.describe('cdn-with-fallback docs', { tag: ['@docs', '@integration', '@cdn'] }, () => {
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

  test('each configuration shows an entry URL and its import map', async ({ page }) => {
    for (const { id } of CONFIGURATIONS.slice(0, 5)) {
      const section = page.locator(`#${id}`).locator('xpath=..');
      const blocks = await section.locator('pre').allInnerTexts();
      expect(blocks.length, `missing code blocks for #${id}`).toBeGreaterThanOrEqual(2);
      expect(blocks.some(text => text.includes('importmap')), `missing import map for #${id}`).toBe(true);
    }

    const bundler = page.locator(`#${CONFIGURATIONS[5].id}`).locator('xpath=..');
    await expect(bundler).toContainText('no import map');
  });

  test('requests info opens a grouped popover and filters it', async ({ page }) => {
    await page.getByRole('button', { name: /^Show the \d+ JavaScript requests$/ }).first().click();

    const popover = page.locator('[role="dialog"]').filter({ hasText: /^JavaScript requests \(\d+\)/ }).first();
    await expect(popover).toBeVisible();
    await expect(popover.getByRole('button', { name: /^All \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'true');

    await popover.getByRole('button', { name: /^React \(\d+\)$/ }).click();
    await expect(popover.getByRole('button', { name: /^React \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(popover.getByRole('button', { name: /^Emotion \(\d+\)$/ })).toHaveAttribute('aria-pressed', 'false');

    await popover.getByRole('button', { name: /^Emotion \(\d+\)$/ }).click();
    await expect(popover.getByText(/@emotion\//).first()).toBeVisible();
  });

  test('the measured cost panel lists the six configurations in page order', async ({ page }) => {
    const body = await page.locator('body').innerText();
    // Start after the panel heading: the same titles also appear in the overview list.
    const panelText = body.slice(body.indexOf('Measured cost'));
    const positions = CONFIGURATIONS.map(({ title }) => panelText.indexOf(title));
    positions.forEach((position, index) => {
      expect(position, `missing panel row ${CONFIGURATIONS[index].title}`).toBeGreaterThan(-1);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
