import { expect, test } from '@playwright/test';
import { installObserverProbe, observerProbe, visit } from '../helpers.mjs';

const inputObservers = probe => probe.observers.MutationObserver;

const readBorderColor = root => root.evaluate(element => getComputedStyle(element).borderColor);

// Border color transitions over 200ms. Wait for the painted value to stay
// unchanged across animation frames so the captured color is the settled one.
const settledBorderColor = root => root.evaluate(element => new Promise((resolve) => {
  let last = getComputedStyle(element).borderColor;
  let stableFrames = 0;
  const tick = () => {
    const current = getComputedStyle(element).borderColor;
    stableFrames = current === last ? stableFrames + 1 : 0;
    last = current;
    if (stableFrames >= 3) {
      resolve(current);
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}));

test.describe('InputControl', { tag: ['@input-control', '@environment'] }, () => {
  test('updates native validity through the iframe window MutationObserver', async ({ page }) => {
    await installObserverProbe(page);
    const scope = await visit(page, 'input-control', { environment: 'iframe' });
    const root = scope.getByTestId('input');
    const input = root.locator('input');
    const before = await observerProbe(page);
    const initialBorder = await settledBorderColor(root);

    // The component reads native `validity` after focus rerenders with the input ref.
    await input.click();
    await scope.getByTestId('page-outside').click();
    await expect.poll(() => input.evaluate(element => element.validity.valid)).toBe(false);
    await expect.poll(() => readBorderColor(root)).not.toBe(initialBorder);
    const invalidBorder = await settledBorderColor(root);
    expect(invalidBorder).not.toBe(initialBorder);

    // A controlled value change updates the value attribute, so the native
    // validity becomes valid and the observer callback must run.
    await input.click();
    await input.fill('a');
    await scope.getByTestId('page-outside').click();
    await expect.poll(() => input.evaluate(element => element.validity.valid)).toBe(true);
    await expect.poll(() => readBorderColor(root)).not.toBe(invalidBorder);
    const validBorder = await settledBorderColor(root);
    expect(validBorder).toBe(initialBorder);
    expect(validBorder).not.toBe(invalidBorder);

    // Clearing the required input restores the native invalid state.
    await input.click();
    await input.fill('');
    await scope.getByTestId('page-outside').click();
    await expect.poll(() => input.evaluate(element => element.validity.valid)).toBe(false);
    await expect.poll(() => readBorderColor(root)).not.toBe(validBorder);
    expect(await settledBorderColor(root)).toBe(invalidBorder);

    const after = await observerProbe(page);
    const inputObservations = after.observed.filter(entry => (
      entry.name === 'MutationObserver' && entry.targetTestId === 'input-control-input'
    ));
    expect(inputObservations.length).toBeGreaterThan(0);
    expect(inputObservations.every(entry => entry.realm === 'iframe')).toBe(true);
    expect(inputObservers(after).callbacks.iframe).toBeGreaterThan(inputObservers(before).callbacks.iframe);
  });
});
