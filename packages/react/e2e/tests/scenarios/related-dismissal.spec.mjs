// Shared outside-interaction behavior for the useClickOutside consumers
// (Autocomplete, DatePicker) and for Dropdown, which inherits Menu's
// onInteractOutside contract. Autocomplete and DatePicker listen to the default
// mousedown/touchstart pair; Dropdown listens to click.
import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

// A tap also emits a compatibility mousedown. Check touchstart before that phase.
const touchStart = async (page, target) => {
  const box = await target.boundingBox();
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
  });
  return session;
};

test.describe('Autocomplete', { tag: '@autocomplete' }, () => {
  test('dismisses on mousedown outside while portalled list interactions stay internal', { tag: ['@interact-outside', '@portal'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { portalled: '' });
    const content = scope.getByTestId('content');

    await expect(content).toHaveCount(0);
    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

    await scope.getByTestId('inside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'close')).toEqual([]);

    const outside = scope.getByTestId('outside');
    const box = await outside.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    await page.mouse.up();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('selects a portalled option without reporting an outside interaction', { tag: ['@interact-outside', '@portal'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { portalled: '' });

    await scope.getByTestId('trigger').click();
    await expect(scope.getByTestId('content')).toBeVisible();
    await scope.getByRole('option', { name: 'Banana' }).click();
    await expect(scope.getByTestId('content')).toBeHidden();

    expect(await events(scope, 'change')).toEqual([{ type: 'change', value: 'Banana' }]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    await expect(scope.getByTestId('trigger')).toHaveValue('Banana');
  });

  test('removes document listeners on unmount and reattaches on remount', { tag: ['@interact-outside', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete');
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('unmount').click();
    await expect(scope.getByTestId('trigger')).toHaveCount(0);

    const before = await events(scope);
    await scope.getByTestId('outside').click();
    await scope.getByTestId('page-outside').click();
    expect(await events(scope)).toEqual(before);

    await scope.getByTestId('remount').click();
    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('outside').click();
    await expect(content).toBeHidden();
    expect((await events(scope, 'close')).length).toBe((before.filter(entry => entry.type === 'close')).length + 1);
  });

  test.describe('touch', () => {
    test.use({ hasTouch: true });

    test('dismisses on touchstart outside and keeps list touches internal', { tag: ['@interact-outside', '@touch'] }, async ({ page }) => {
      const scope = await visit(page, 'autocomplete', { portalled: '' });
      const content = scope.getByTestId('content');

      await scope.getByTestId('trigger').click();
      await expect(content).toBeVisible();
      await scope.getByTestId('inside').tap();
      await expect(content).toBeVisible();
      expect(await events(scope, 'close')).toEqual([]);

      const touch = await touchStart(page, scope.getByTestId('outside'));
      await expect(content).toBeHidden();
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
      await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await touch.detach();
    });
  });

  for (const environment of ['shadow', 'iframe']) {
    test(`keeps portalled list interactions internal and dismisses from outside in ${environment}`, { tag: ['@interact-outside', '@portal'] }, async ({ page }) => {
      const scope = await visit(page, 'autocomplete', { environment, portalled: '' });
      const content = scope.getByTestId('content');

      await scope.getByTestId('trigger').click();
      await expect(content).toBeVisible();
      if (environment === 'shadow') {
        expect(await content.evaluate(element => element.getRootNode() instanceof ShadowRoot)).toBe(true);
      }
      if (environment === 'iframe') {
        expect(await content.evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);
      }

      await scope.getByTestId('inside').click();
      await expect(content).toBeVisible();
      expect(await events(scope, 'outside')).toEqual([]);

      await scope.getByTestId('outside').click();
      await expect(content).toBeHidden();
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });
  }

  test('removes iframe document listeners when unmounted', { tag: ['@interact-outside', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'autocomplete', { environment: 'iframe' });
    const content = scope.getByTestId('content');

    await scope.getByTestId('trigger').click();
    await expect(content).toBeVisible();
    await scope.getByTestId('unmount').click();
    await expect(scope.getByTestId('trigger')).toHaveCount(0);

    const before = await events(scope);
    await scope.getByTestId('outside').click();
    expect(await events(scope)).toEqual(before);
  });
});

test.describe('DatePicker', { tag: '@date-picker' }, () => {
  test('dismisses on mousedown outside', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker');
    const content = scope.getByRole('menu');

    await expect(content).toHaveCount(0);
    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();

    const outside = scope.getByTestId('outside');
    const box = await outside.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    await page.mouse.up();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('keeps the calendar internal and stays open after selection when closeOnSelect is false', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker');
    const content = scope.getByRole('menu');
    const day = scope.locator('[data-date="2024-06-20"]');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    await day.click();
    await expect(content).toBeVisible();
    await expect(scope.getByTestId('trigger')).toHaveValue('2024-06-20');
    expect(await events(scope, 'change')).toEqual([{ type: 'change', value: [2024, 5, 20] }]);
    expect(await events(scope, 'close')).toEqual([]);

    await day.press('Escape');
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('closes after selection when closeOnSelect is enabled', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker', { closeOnSelect: '' });
    const content = scope.getByRole('menu');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    await scope.locator('[data-date="2024-06-20"]').click();
    await expect(content).toBeHidden();
    expect(await events(scope, 'change')).toEqual([{ type: 'change', value: [2024, 5, 20] }]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('treats portalled calendar interactions as internal', { tag: ['@interact-outside', '@portal'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker', { portalled: '' });
    const content = scope.getByRole('menu');
    const day = scope.locator('[data-date="2024-06-20"]');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

    await day.click();
    // closeOnSelect defaults to false, so selecting inside the portalled calendar
    // must not be treated as an outside interaction.
    expect(await events(scope, 'close')).toEqual([]);
    expect(await events(scope, 'change')).toEqual([{ type: 'change', value: [2024, 5, 20] }]);
    await expect(content).toBeVisible();
  });

  test('removes document listeners on unmount and reattaches on remount', { tag: ['@interact-outside', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker');
    const content = scope.getByRole('menu');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    await scope.getByTestId('unmount').click();
    await expect(scope.getByTestId('trigger')).toHaveCount(0);

    const before = await events(scope);
    await scope.getByTestId('outside').click();
    await scope.getByTestId('page-outside').click();
    expect(await events(scope)).toEqual(before);

    await scope.getByTestId('remount').click();
    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
  });

  test.describe('touch', () => {
    test.use({ hasTouch: true });

    test('dismisses on touchstart outside', { tag: ['@interact-outside', '@touch'] }, async ({ page }) => {
      const scope = await visit(page, 'date-picker');
      const content = scope.getByRole('menu');

      await scope.getByTestId('trigger').focus();
      await expect(content).toBeVisible();
      const touch = await touchStart(page, scope.getByTestId('outside'));
      await expect(content).toBeHidden();
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
      await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await touch.detach();
    });
  });

  for (const environment of ['shadow', 'iframe']) {
    test(`dismisses from outside in ${environment}`, { tag: ['@interact-outside'] }, async ({ page }) => {
      const scope = await visit(page, 'date-picker', { environment });
      const content = scope.getByRole('menu');

      await scope.getByTestId('trigger').focus();
      await expect(content).toBeVisible();
      await scope.getByTestId('outside').click();
      await expect(content).toBeHidden();
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });
  }

  test('removes iframe document listeners when unmounted', { tag: ['@interact-outside', '@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker', { environment: 'iframe' });
    const content = scope.getByRole('menu');

    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();
    await scope.getByTestId('unmount').click();
    await expect(scope.getByTestId('trigger')).toHaveCount(0);

    const before = await events(scope);
    await scope.getByTestId('outside').click();
    expect(await events(scope)).toEqual(before);
  });

  test('ignores the parent document while its portalled calendar is in an iframe', { tag: ['@interact-outside', '@portal'] }, async ({ page }) => {
    const scope = await visit(page, 'date-picker', { environment: 'iframe', portalled: '' });
    const content = scope.getByRole('menu');
    await scope.getByTestId('trigger').focus();
    await expect(content).toBeVisible();

    await page.locator('html').click({ position: { x: 1, y: 1 } });
    expect(await events(scope, 'close')).toEqual([]);
    await expect(content).toBeVisible();

    await scope.getByTestId('outside').click();
    await expect(content).toBeHidden();
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });
});

test.describe('Dropdown', { tag: '@dropdown' }, () => {
  test('dismisses on outside click with inherited callbacks', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown');
    const content = scope.getByTestId('content');

    await open(scope);
    await scope.getByTestId('outside').click();
    await expect(content).toBeHidden();
    expect(await events(scope, 'outside')).toEqual([
      { type: 'outside', eventType: 'click', target: 'outside', cancelable: true, defaultPrevented: false },
    ]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    await expect(scope.getByTestId('trigger')).toBeFocused();
  });

  test('reports outside interaction without closing when opted out', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { optOut: '' });
    const content = scope.getByTestId('content');

    await open(scope);
    await scope.getByTestId('outside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'outside')).toHaveLength(1);
    expect(await events(scope, 'close')).toEqual([]);
  });

  test('honors preventDefault from onInteractOutside', { tag: ['@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { cancel: '' });
    const content = scope.getByTestId('content');

    await open(scope);
    await scope.getByTestId('outside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'outside')).toEqual([
      { type: 'outside', eventType: 'click', target: 'outside', cancelable: true, defaultPrevented: true },
    ]);
    expect(await events(scope, 'close')).toEqual([]);
  });

  test('treats portalled submenu interaction as internal and closes on selection', { tag: ['@portal', '@interact-outside'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { portalled: '' });
    const content = scope.getByTestId('content');

    await open(scope);
    expect(await content.evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(true);

    await scope.getByTestId('inside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'outside')).toEqual([]);

    await scope.getByTestId('submenu-trigger').hover();
    await expect(scope.getByTestId('nested-item')).toBeVisible();
    await scope.getByTestId('submenu-inside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'outside')).toEqual([]);
    expect(await events(scope, 'close')).toEqual([]);

    await scope.getByTestId('nested-item').click();
    await expect(content).toBeHidden();
    expect(await events(scope, 'change')).toEqual([{ type: 'change', value: 'two' }]);
    expect(await events(scope, 'outside')).toEqual([]);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });

  test('lets the controlled parent close and reopen without duplicate callbacks', { tag: ['@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { controlled: '', initiallyOpen: '' });
    const content = scope.getByTestId('content');
    await expect(content).toBeVisible();

    for (let cycle = 1; cycle <= 2; cycle++) {
      await scope.getByTestId('outside').click();
      await expect(content).toBeHidden();
      expect(await events(scope, 'outside')).toHaveLength(cycle);
      expect(await events(scope, 'close')).toHaveLength(cycle);
      await open(scope);
    }
  });

  test('requests closure without overriding a fixed controlled isOpen', { tag: ['@lifecycle'] }, async ({ page }) => {
    const scope = await visit(page, 'dropdown', { controlled: '', initiallyOpen: '', holdOpen: '' });
    const content = scope.getByTestId('content');
    await expect(content).toBeVisible();

    await scope.getByTestId('outside').click();
    await expect(content).toBeVisible();
    expect(await events(scope, 'outside')).toHaveLength(1);
    expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
  });
});
