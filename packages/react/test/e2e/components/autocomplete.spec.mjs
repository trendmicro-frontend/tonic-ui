// Autocomplete list sizing depends on the input's measured `offsetWidth` and on
// Popper's matchWidth modifier, neither of which jsdom can provide. These tests
// assert the real rendered widths for the `matchWidth` and default modes.
import { expect, test } from '@playwright/test';
import { visit } from '../helpers.mjs';

const WIDE_LABEL = 'W'.repeat(160);

test.describe('Autocomplete', { tag: '@autocomplete' }, () => {
  test('sizes the listbox to the measured input width when matchWidth is set', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { matchWidth: '', wide: '', width: '320px' });
    const input = scope.getByTestId('input-control');
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();

    const inputWidth = await input.evaluate(element => element.getBoundingClientRect().width);
    const contentWidth = await content.evaluate(element => element.getBoundingClientRect().width);
    expect(inputWidth).toBeGreaterThan(0);

    // The content-driven width would be capped at 640px; matchWidth replaces it
    // with the input's measured width and drops both the floor and the cap.
    // Native fractional rounding can differ by up to 1px between the anchor's
    // border box and the applied popper width.
    expect(Math.abs(contentWidth - inputWidth)).toBeLessThanOrEqual(1);
    await expect(content).toHaveCSS('max-width', 'none');
    await expect(content).toHaveCSS('min-width', '0px');

    // The wide item is present and unbreakable, so the equality above is not an
    // accident of content that happens to fit the input width.
    await expect(scope.getByRole('option', { name: WIDE_LABEL })).toBeVisible();
  });

  test('keeps the content-driven width with the input-width floor and 640px cap by default', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { wide: '', width: '320px' });
    const input = scope.getByTestId('input-control');
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();

    const inputWidth = await input.evaluate(element => element.offsetWidth);
    expect(inputWidth).toBeGreaterThan(0);

    await expect(content).toHaveCSS('min-width', `${inputWidth}px`);
    await expect(content).toHaveCSS('max-width', '640px');
    await expect(content).toHaveCSS('width', '640px');

    const contentWidth = await content.evaluate(element => element.getBoundingClientRect().width);
    expect(contentWidth).toBeCloseTo(640, 1);
    expect(contentWidth).toBeGreaterThan(inputWidth);
  });

  test('scrolls the keyboard-highlighted option into view in the iframe document', { tag: ['@keyboard'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { environment: 'iframe', many: '' });
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await trigger.click();
    await expect(content).toBeVisible();

    // The list is capped at 40vh; moving past the visible rows must scroll the
    // option that the environment document resolves by id into view.
    for (let index = 0; index < 12; index++) {
      await trigger.press('ArrowDown');
    }

    await expect.poll(() => content.evaluate(element => element.scrollTop)).toBeGreaterThan(0);

    const highlighted = await content.evaluate((element) => {
      const option = element.querySelector('[aria-selected="true"]');
      const contentBox = element.getBoundingClientRect();
      const optionBox = option.getBoundingClientRect();
      return {
        inIframe: element.ownerDocument !== window.parent.document,
        label: option.textContent,
        optionBottom: optionBox.bottom,
        optionTop: optionBox.top,
        scrollTop: element.scrollTop,
        viewBottom: contentBox.bottom,
        viewTop: contentBox.top,
      };
    });

    expect(highlighted.inIframe).toBe(true);
    expect(highlighted.label).toBe('Item 12');
    expect(highlighted.scrollTop).toBeGreaterThan(0);
    expect(highlighted.optionTop).toBeGreaterThanOrEqual(highlighted.viewTop - 1);
    expect(highlighted.optionBottom).toBeLessThanOrEqual(highlighted.viewBottom + 1);
  });
});
