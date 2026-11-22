import { expect, test } from '@playwright/test';
import { visit } from '../helpers.mjs';

// Chromium can match inclusive comparisons one layout unit (1/64px) early.
const widths = [299, 299.96875, 300, 300.015625, 639.96875, 640, 640.015625, 767.984375, 768, 768.015625, 299];

const expectWidth = async (locator, width) => {
  await expect.poll(async () => {
    const bounds = await locator.boundingBox();
    return bounds ? Math.abs(bounds.width - width) : Infinity;
  }).toBeLessThanOrEqual(0.001);
};

test('uses the named ancestor instead of the nearest container or viewport', {
  tag: ['@container-queries', '@boundary', '@geometry'],
}, async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await visit(page, 'container-queries');
  await expect(page.locator('html')).toHaveCSS('font-size', '16px');

  const input = page.getByRole('spinbutton', { name: 'Outer width (px)' });
  const outer = page.getByTestId('outer-container');
  const inner = page.getByTestId('inner-container');
  const expectQueries = async (width) => {
    await expectWidth(outer, width);
    await expectWidth(inner, 200);
    for (const [id, matches] of [
      ['named-gte', width >= 300],
      ['unnamed-gte', false],
      ['named-lt', width < 300],
      ['named-between', width >= 300 && width < 640],
      ['named-only', width >= 640 && width < 768],
    ]) {
      await expect(inner.getByTestId(id), `${id} at ${width}px`).toHaveCSS('display', matches ? 'block' : 'none');
    }
  };

  for (const width of widths) {
    await input.fill(String(width));
    await expectQueries(width);
  }

  // Cross the same thresholds with the viewport while keeping the container fixed.
  await input.fill('640');
  await expectQueries(640);
  for (const width of [550, 280]) {
    await page.setViewportSize({ width, height: 1000 });
    await expectQueries(640);
  }
});

test('keeps flat and internal maps while sx wins at the same custom breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 639, height: 900 });
  await visit(page, 'container-queries');
  const box = page.getByTestId('responsive-channels');
  for (const [width, cssWidth, height, minHeight] of [[639, '100px', '30px', '10px'], [640, '160px', '40px', '20px']]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(box).toHaveCSS('width', cssWidth);
    await expect(box).toHaveCSS('height', height);
    await expect(box).toHaveCSS('min-height', minHeight);
  }
});
