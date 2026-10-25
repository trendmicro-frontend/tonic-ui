import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

for (const kind of ['menu', 'popover']) {
  test.describe(kind, { tag: ['@interact-outside', '@portal', '@lifecycle', `@${kind}`] }, () => {
    test('keeps iframe portal clicks internal and dismisses from the owning document', async ({ page }) => {
      const scope = await visit(page, kind, { environment: 'iframe', portalled: '' });
      await open(scope);
      await scope.getByTestId('inside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toEqual([]);
      expect(await scope.getByTestId('content').evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect(await events(scope, 'outside')).toHaveLength(1);
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });

    test('removes iframe document listeners when an open overlay unmounts', async ({ page }) => {
      const scope = await visit(page, kind, { environment: 'iframe', portalled: '' });
      await open(scope);
      await scope.getByTestId('unmount').click();
      await expect(scope.getByTestId('trigger')).toHaveCount(0);
      const before = await events(scope);
      await scope.getByTestId('outside').click();
      expect(await events(scope)).toEqual(before);
    });

    for (const portalled of [false, true]) {
      test(`keeps Shadow DOM content clicks internal (portalled=${portalled})`, async ({ page }) => {
        const scope = await visit(page, kind, {
          environment: 'shadow', controlled: '', holdOpen: '', initiallyOpen: '',
          ...(portalled ? { portalled: '' } : {}),
        });
        await expect(scope.getByTestId('content')).toBeVisible();
        await scope.getByTestId('inside').click();
        expect(await events(scope, 'outside')).toEqual([]);
        expect(await events(scope, 'close')).toEqual([]);
      });
    }

    test('opens, toggles, and dismisses an uncontrolled Shadow DOM overlay', async ({ page }) => {
      const scope = await visit(page, kind, { environment: 'shadow', portalled: '' });
      await open(scope);
      await scope.getByTestId('inside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toEqual([]);
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect(await events(scope, 'outside')).toEqual([]);
      await open(scope);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect(await events(scope, 'outside')).toHaveLength(1);
      expect(await events(scope, 'close')).toHaveLength(2);
    });
  });
}
