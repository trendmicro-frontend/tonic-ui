// Popper exposes positioning primitives only: it has no outside-interaction
// callback and must not dismiss on outside clicks. These tests cover placement,
// flip at the viewport edge, matchWidth, portal ownership, and the absence of
// automatic dismissal.
import { expect, test } from '@playwright/test';
import { events, installObserverProbe, observerProbe, visit } from '../helpers.mjs';

test.describe('Popper', { tag: '@popper' }, () => {
  for (const environment of ['document', 'iframe']) {
    test(`repositions resized content within its clipping boundary (${environment})`, { tag: ['@positioning', '@boundary'] }, async ({ page }) => {
      await installObserverProbe(page);
      const scope = await visit(page, 'popper', { environment, boundary: '', resize: '' });
      const content = scope.getByTestId('content');
      await scope.getByTestId('trigger').click();
      await expect(content).toHaveAttribute('data-popper-placement', 'bottom-start');
      const realm = environment === 'iframe' ? 'iframe' : 'top';
      const otherRealm = environment === 'iframe' ? 'top' : 'iframe';
      const initialObservers = (await observerProbe(page)).observers.ResizeObserver;
      expect(initialObservers.constructed[realm]).toBeGreaterThan(0);
      expect(initialObservers.constructed[otherRealm]).toBe(0);
      await scope.getByTestId('grow').click();
      await expect(content).toHaveAttribute('data-popper-placement', 'top-start');
      await expect.poll(async () => (await observerProbe(page)).observers.ResizeObserver.callbacks[realm]).toBeGreaterThan(initialObservers.callbacks[realm]);
      const boundary = await scope.getByTestId('boundary').boundingBox();
      const box = await content.boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(boundary.y + 7);
      expect(box.y + box.height).toBeLessThanOrEqual(boundary.y + boundary.height - 7);
      expect(box.x).toBeGreaterThanOrEqual(boundary.x + 7);
      expect(box.x + box.width).toBeLessThanOrEqual(boundary.x + boundary.width - 7);
      await scope.getByTestId('grow').click();
      await expect(content).toHaveAttribute('data-popper-placement', 'bottom-start');
    });
  }

  test('positions with the preferred placement and ignores outside interactions', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'popper');
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await expect(content).toHaveCount(0);
    await trigger.click();
    await expect(content).toBeVisible();
    await expect(content).toHaveAttribute('data-popper-placement', 'bottom-start');
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(false);

    const triggerBox = await trigger.boundingBox();
    const contentBox = await content.boundingBox();
    expect(contentBox.y).toBeGreaterThanOrEqual(triggerBox.y + triggerBox.height - 1);

    await scope.getByTestId('inside').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('outside').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('page-outside').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('focus-target').focus();
    await expect(content).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(content).toBeVisible();

    expect(await events(scope, 'open')).toEqual([{ type: 'open' }]);
    expect(await events(scope, 'close')).toEqual([]);

    await trigger.click();
    await expect(content).toHaveCount(0);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('flips above the reference when there is no room below', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'popper', { placement: 'bottom', edge: '' });
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await trigger.click();
    await expect(content).toBeVisible();
    await expect(content).toHaveAttribute('data-popper-placement', 'top');
    await expect(scope.getByTestId('inside')).toHaveAttribute('data-computed-placement', 'top');

    const triggerBox = await trigger.boundingBox();
    const contentBox = await content.boundingBox();
    expect(contentBox.y + contentBox.height).toBeLessThanOrEqual(triggerBox.y + 1);
  });

  test('sizes the content to the reference width when matchWidth is set', { tag: ['@positioning'] }, async ({ page }) => {
    const scope = await visit(page, 'popper', { matchWidth: '' });
    const trigger = scope.getByTestId('trigger');
    const content = scope.getByTestId('content');

    await trigger.click();
    await expect(content).toBeVisible();

    const referenceWidth = await trigger.evaluate(element => element.getBoundingClientRect().width);
    const contentWidth = await content.evaluate(element => element.getBoundingClientRect().width);
    expect(referenceWidth).toBeCloseTo(240, 1);
    expect(contentWidth).toBeCloseTo(referenceWidth, 1);
  });

  for (const environment of ['document', 'shadow', 'iframe']) {
    test(`portals into the ${environment} realm and never dismisses on outside clicks`, { tag: ['@portal'] }, async ({ page }) => {
      const scope = await visit(page, 'popper', { environment, portalled: '' });
      const trigger = scope.getByTestId('trigger');
      const content = scope.getByTestId('content');

      await trigger.click();
      await expect(content).toBeVisible();
      expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

      if (environment === 'document') {
        expect(await content.evaluate(element => element.ownerDocument === document)).toBe(true);
      }
      if (environment === 'shadow') {
        expect(await content.evaluate(element => element.getRootNode() instanceof ShadowRoot)).toBe(true);
        expect(await content.evaluate(element => element.getRootNode().host.dataset.testid)).toBe('shadow-host');
      }
      if (environment === 'iframe') {
        expect(await content.evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);
        expect(await content.evaluate(element => element.ownerDocument === document)).toBe(true);
      }

      await scope.getByTestId('outside').click();
      await expect(content).toBeVisible();
      await scope.getByTestId('page-outside').click();
      await expect(content).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(content).toBeVisible();
      expect(await events(scope, 'close')).toEqual([]);
    });
  }
});
