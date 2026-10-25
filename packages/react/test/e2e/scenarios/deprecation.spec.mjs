import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

for (const kind of ['menu', 'popover']) {
  test.describe(kind, { tag: ['@deprecation', `@${kind}`] }, () => {
    test('does not let deprecated closeOnBlur override closeOnInteractOutside=false', async ({ page }) => {
      const scope = await visit(page, kind, { legacy: 'root', legacyValue: 'true', optOut: '' });
      await open(scope);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toHaveLength(1);
      expect(await events(scope, 'close')).toEqual([]);
    });

    for (const legacy of ['root', 'content']) {
      for (const legacyValue of ['true', 'false']) {
        test(`warns once for closeOnBlur=${legacyValue} on ${legacy}, ignores it, and never forwards it to DOM`, async ({ page }) => {
          const warnings = [];
          page.on('console', message => {
            if (message.type() === 'error' && message.text().includes('closeOnBlur')) {
              warnings.push(message.text());
            }
          });
          const scope = await visit(page, kind, { legacy, legacyValue });
          await open(scope);
          await scope.getByTestId('outside').click();
          await expect(scope.getByTestId('content')).toBeHidden();
          await open(scope);
          await expect(scope.getByTestId('content')).toBeVisible();
          const name = `${kind === 'menu' ? 'Menu' : 'Popover'}${legacy === 'content' ? 'Content' : ''}`;
          if (process.env.E2E_NODE_ENV === 'production') {
            expect(warnings).toEqual([]);
          } else {
            expect(warnings).toHaveLength(1);
            expect(warnings[0]).toContain(`${name}:`);
            expect(warnings[0]).toContain('deprecated');
            expect(warnings[0]).toContain('closeOnInteractOutside');
          }
          await expect(scope.locator('[closeonblur]')).toHaveCount(0);
        });
      }
    }
  });
}
