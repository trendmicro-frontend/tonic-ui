// Dropdown content sizing reads the committed toggle's `offsetWidth` and feeds
// it to `getDropdownContentStyle`. These tests measure the real menu width in
// the `matchWidth` and default modes instead of stubbing DOM geometry.
import { expect, test } from '@playwright/test';
import { open, visit } from '../helpers.mjs';

test.describe('Dropdown', { tag: '@dropdown' }, () => {
  test('matches the menu width to the measured toggle width when matchWidth is set', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { matchWidth: '', wide: '' });
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await open(scope);

    const toggleWidth = await trigger.evaluate(element => element.getBoundingClientRect().width);
    const contentWidth = await content.evaluate(element => element.getBoundingClientRect().width);
    expect(toggleWidth).toBeGreaterThan(0);

    // The content-driven width would be capped at 640px; matchWidth replaces it
    // with the toggle's measured width and drops both the floor and the cap.
    // Native fractional rounding can differ by up to 1px between the toggle's
    // border box and the applied popper width.
    expect(Math.abs(contentWidth - toggleWidth)).toBeLessThanOrEqual(1);
    await expect(content).toHaveCSS('max-width', 'none');
    await expect(content).toHaveCSS('min-width', '0px');
  });

  test('keeps the content-driven width with the toggle-width floor and 640px cap by default', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { wide: '' });
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await open(scope);

    const toggleWidth = await trigger.evaluate(element => element.offsetWidth);
    expect(toggleWidth).toBeGreaterThan(0);

    await expect(content).toHaveCSS('min-width', `${toggleWidth}px`);
    await expect(content).toHaveCSS('max-width', '640px');
    await expect(content).toHaveCSS('width', '640px');

    const contentWidth = await content.evaluate(element => element.getBoundingClientRect().width);
    expect(contentWidth).toBeCloseTo(640, 1);
    expect(contentWidth).toBeGreaterThan(toggleWidth);
  });
});
