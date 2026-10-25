import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

test.use({ hasTouch: true });

for (const component of ['menu', 'popover', 'modal', 'drawer']) {
  test(`touch interactions preserve content boundaries and dismiss ${component} once`, { tag: ['@interact-outside', '@touch', `@${component}`] }, async ({ page }) => {
    const scope = await visit(page, component, { dismiss: 'true', ...(component === 'drawer' ? { backdrop: '' } : {}) });
    await scope.getByTestId('trigger').tap();
    await expect(scope.getByTestId('content')).toBeVisible();
    await scope.getByTestId('inside').tap();
    await expect(scope.getByTestId('content')).toBeVisible();
    expect(await events(scope, 'outside')).toEqual([]);
    await scope.getByTestId('outside').tap({ position: { x: 12, y: 12 } });
    await expect(scope.getByTestId('content')).toBeHidden();
    expect(await events(scope, 'outside')).toHaveLength(1);
    expect(await events(scope, 'outside')).toEqual([
      expect.objectContaining({ eventType: 'click', cancelable: true, defaultPrevented: false }),
    ]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });
}
