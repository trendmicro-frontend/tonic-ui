// Tooltip and OverflowTooltip have no outside-interaction callback. These tests
// exercise their real trigger contract: hover/focus/blur, pointer and click
// opt-outs, Escape bound to the environment document, disabled rendering,
// controlled lifecycle, portals, and shadow/iframe realms.
import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

test.describe('Tooltip', { tag: '@tooltip' }, () => {
  test('opens on hover and closes on leave', { tag: ['@hover', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip');
    const content = scope.getByTestId('content');

    await expect(content).toHaveCount(0);
    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await expect(scope.getByRole('tooltip')).toContainText('Tooltip label');
    await expect(scope.getByTestId('inside')).toBeVisible();

    await scope.getByTestId('outside').hover();
    await expect(content).toBeHidden();
  });

  test('opens on focus and closes on blur', { tag: ['@focus', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip');
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    expect(await events(scope, 'open')).toEqual([{ type: 'open' }]);

    await scope.getByTestId('focus-target').focus();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('closes on Escape from the environment document', { tag: ['@keyboard'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip');
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('honors closeOnEsc=false', { tag: ['@keyboard'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { noCloseOnEsc: '' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(content).toBeVisible();
    expect(await events(scope, 'close')).toEqual([]);

    await scope.getByTestId('outside').hover();
    await expect(content).toBeHidden();
  });

  test('closes on pointer down before click', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { noOpenOnFocus: '' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await page.mouse.down();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    await page.mouse.up();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('closes on click when pointer-down dismissal is disabled', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { noOpenOnFocus: '', noCloseOnPointerDown: '' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await page.mouse.down();
    await expect(content).toBeVisible();
    expect(await events(scope, 'close')).toEqual([]);
    await page.mouse.up();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('keeps the tooltip open when closeOnClick and closeOnPointerDown are opted out', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { noOpenOnFocus: '', optOut: '' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'close')).toEqual([]);

    await scope.getByTestId('outside').hover();
    await expect(content).toBeHidden();
  });

  test('does not render while disabled', { tag: ['@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { disabled: '' });

    await scope.getByTestId('trigger').hover();
    await expect(scope.getByTestId('content')).toHaveCount(0);
    await scope.getByTestId('trigger').focus();
    await expect(scope.getByRole('tooltip')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(scope.getByTestId('content')).toHaveCount(0);
  });

  test('lets the controlled parent close and reopen', { tag: ['@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { controlled: '', initiallyOpen: '' });
    const content = scope.getByTestId('content');
    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
    expect(await events(scope, 'open')).toEqual([]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);

    await scope.getByTestId('controlled-toggle').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'open')).toEqual([]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('requests closure without overriding a fixed controlled isOpen', { tag: ['@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { controlled: '', initiallyOpen: '', holdOpen: '' });
    const content = scope.getByTestId('content');
    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(content).toBeVisible();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);

    await scope.getByTestId('controlled-toggle').click();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('renders portalled content inside the portal container', { tag: ['@portal'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { portalled: '' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
  });

  test.describe('environments', () => {
    test('opens and closes in an open shadow root', { tag: ['@portal', '@hover'] }, async ({ page }) => {
      const scope = await visit(page, 'tooltip', { environment: 'shadow', portalled: '' });
      const content = scope.getByTestId('content');

      await scope.getByTestId('trigger').hover();
      await expect(content).toBeVisible();
      expect(await content.evaluate(element => element.getRootNode() instanceof ShadowRoot)).toBe(true);
      expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

      // The environment document for a shadow root is its owner document.
      await page.keyboard.press('Escape');
      await expect(content).toBeHidden();
    });

    test('binds Escape to the iframe document', { tag: ['@portal', '@keyboard'] }, async ({ page }) => {
      const scope = await visit(page, 'tooltip', { environment: 'iframe', portalled: '' });
      const content = scope.getByTestId('content');

      await scope.getByTestId('trigger').hover();
      await expect(content).toBeVisible();
      expect(await content.evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);
      expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

      // A key press in the parent document must not close an iframe-owned tooltip.
      await page.keyboard.press('Escape');
      await expect(content).toBeVisible();

      await scope.getByTestId('trigger').press('Escape');
      await expect(content).toBeHidden();
    });
  });
});

test.describe('OverflowTooltip', { tag: '@overflow-tooltip' }, () => {
  test('activates only when the content overflows', { tag: ['@hover'] }, async ({ page }) => {
    const scope = await visit(page, 'overflow-tooltip');
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    expect(await trigger.evaluate(element => element.getBoundingClientRect().width)).toBeCloseTo(120, 1);
    await expect(content).toHaveCount(0);
    await trigger.hover();
    await expect(content).toBeVisible();
    await expect(content).toContainText('Overflow tooltip');

    const shortScope = await visit(page, 'overflow-tooltip', { noOverflow: '' });
    await page.mouse.move(0, 0);
    await shortScope.getByTestId('trigger').hover();
    await expect(shortScope.getByTestId('content')).toHaveCount(0);
    await expect(shortScope.getByRole('tooltip')).toHaveCount(0);
  });

  test('can be selected through the Tooltip fixture option', { tag: ['@hover'] }, async ({ page }) => {
    const scope = await visit(page, 'tooltip', { overflow: '' });
    const content = scope.getByTestId('content');

    await expect(content).toHaveCount(0);
    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    await expect(content).toContainText('Overflow tooltip');
  });

  test('re-detects overflow on every pointer enter and hides on leave', { tag: ['@hover'] }, async ({ page }) => {
    const scope = await visit(page, 'overflow-tooltip');
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await trigger.hover();
    await expect(content).toBeVisible();
    await scope.getByTestId('outside').hover();
    await expect(content).toBeHidden();
    await trigger.hover();
    await expect(content).toBeVisible();
  });

  test('respects disabled and portalled options', { tag: ['@portal'] }, async ({ page }) => {
    const disabledScope = await visit(page, 'overflow-tooltip', { disabled: '' });
    await disabledScope.getByTestId('trigger').hover();
    await expect(disabledScope.getByTestId('content')).toHaveCount(0);

    const scope = await visit(page, 'overflow-tooltip', { portalled: '' });
    const content = scope.getByTestId('content');
    await page.mouse.move(0, 0);
    await scope.getByTestId('trigger').hover();
    await expect(content).toBeVisible();
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
  });
});
