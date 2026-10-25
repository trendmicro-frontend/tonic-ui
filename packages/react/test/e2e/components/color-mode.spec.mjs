import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

test.describe('System color mode', { tag: ['@color-mode', '@media'] }, () => {
  for (const environment of ['document', 'iframe']) {
    test(`tracks the native system preference in ${environment}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      const scope = await visit(page, 'color-mode', { environment });
      await expect(scope.getByTestId('color-mode')).toHaveText('dark');
      expect(await events(scope, 'color-mode')).toEqual([{ type: 'color-mode', mode: 'dark' }]);
      await page.emulateMedia({ colorScheme: 'light' });
      await expect(scope.getByTestId('color-mode')).toHaveText('light');
      await page.emulateMedia({ colorScheme: 'dark' });
      await expect(scope.getByTestId('color-mode')).toHaveText('dark');
    });
  }

  test('queries the iframe window rather than the parent window', async ({ page }) => {
    const scope = await visit(page, 'color-mode', { environment: 'iframe' });
    await scope.getByTestId('unmount').click();
    await page.evaluate(() => {
      for (const win of [window, document.querySelector('iframe').contentWindow]) {
        const nativeMatchMedia = win.matchMedia.bind(win);
        win.__mediaQueries = [];
        win.matchMedia = query => {
          win.__mediaQueries.push(query);
          return nativeMatchMedia(query);
        };
      }
    });
    await scope.getByTestId('remount').click();
    await expect(scope.getByTestId('color-mode')).toBeVisible();
    const queries = await page.evaluate(() => ({
      parent: window.__mediaQueries,
      frame: document.querySelector('iframe').contentWindow.__mediaQueries,
    }));
    expect(queries.parent).toEqual([]);
    expect(queries.frame).toContain('(prefers-color-scheme: dark)');
  });

  test('does not override a controlled mode with the system preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    const scope = await visit(page, 'color-mode', { controlled: '' });
    await expect(scope.getByTestId('color-mode')).toHaveText('light');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(scope.getByTestId('color-mode')).toHaveText('light');
  });
});
