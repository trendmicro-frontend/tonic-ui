// Exercise native browser events against the current React sources, including
// portals, cross-document ownership, Shadow DOM, and deprecated prop warnings.
import { expect, test } from '@playwright/test';

const visit = async (page, kind, options = {}) => {
  const query = new URLSearchParams({ kind, ...options });
  await page.goto(`?${query}`);
  const scope = options.environment === 'iframe' ? page.frameLocator('iframe') : page;
  await expect(scope.getByTestId('events')).toBeVisible();
  return scope;
};

const events = async (scope, type) => {
  const entries = JSON.parse(await scope.getByTestId('events').textContent());
  return type ? entries.filter(entry => entry.type === type) : entries;
};

const open = async (scope) => {
  await scope.getByTestId('trigger').click();
  await expect(scope.getByTestId('content')).toBeVisible();
  await expect(scope.getByTestId('content')).toBeFocused();
};

for (const kind of ['menu', 'popover']) {
  test.describe(kind, () => {
    test('dismisses on click, not mousedown, without a focus change; callbacks run once in order', async ({ page }) => {
      const scope = await visit(page, kind);
      await open(scope);
      await expect(scope.getByTestId('content')).toBeFocused();
      const outside = scope.getByTestId('outside');
      const box = await outside.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      expect(await events(scope, 'outside')).toEqual([]);
      await expect(scope.getByTestId('content')).toBeFocused();
      expect(await events(scope, 'blur')).toEqual([]);
      await page.mouse.up();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect((await events(scope)).filter(entry => ['outside', 'close'].includes(entry.type))).toEqual([
        { type: 'outside', eventType: 'click', target: 'outside', cancelable: true, defaultPrevented: false },
        { type: 'close' },
      ]);
      await expect(scope.getByTestId('trigger')).toBeFocused();
    });

    test('keeps focus-only movement open and calls the consumer onBlur', async ({ page }) => {
      const scope = await visit(page, kind);
      await open(scope);
      await expect(scope.getByTestId('content')).toBeFocused();
      await scope.getByTestId('focus-target').focus();
      await expect(scope.getByTestId('focus-target')).toBeFocused();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'blur')).toEqual([{ type: 'blur' }]);
      expect(await events(scope, 'outside')).toEqual([]);
      expect(await events(scope, 'close')).toEqual([]);
    });

    test('notifies while opted out and uses the updated prop when re-enabled', async ({ page }) => {
      const scope = await visit(page, kind, { optOut: '' });
      await open(scope);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toHaveLength(1);
      expect(await events(scope, 'close')).toEqual([]);
      await scope.getByRole('checkbox', { name: 'Dismiss on outside click' }).check();
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect(await events(scope, 'outside')).toHaveLength(2);
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });

    test('honors preventDefault and the updated outside callback', async ({ page }) => {
      const scope = await visit(page, kind, { cancel: '' });
      await open(scope);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toEqual([
        { type: 'outside', eventType: 'click', target: 'outside', cancelable: true, defaultPrevented: true },
      ]);
      expect(await events(scope, 'close')).toEqual([]);
      await scope.getByRole('checkbox', { name: 'Cancel outside dismissal' }).uncheck();
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });

    for (const portalled of [false, true]) {
      test(`keeps content and trigger clicks internal (portalled=${portalled})`, async ({ page }) => {
        const scope = await visit(page, kind, portalled ? { portalled: '' } : {});
        await open(scope);
        expect(await scope.getByTestId('content').evaluate(element => Boolean(element.closest('.tonic-ui-portal')))).toBe(portalled);
        await scope.getByTestId('inside').click();
        await expect(scope.getByTestId('content')).toBeVisible();
        expect(await events(scope, 'outside')).toEqual([]);
        await scope.getByTestId('trigger').click();
        await expect(scope.getByTestId('content')).toBeHidden();
        expect(await events(scope, 'outside')).toEqual([]);
        expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
      });
    }

    test('ignores outside clicks while closed, including after Escape', async ({ page }) => {
      const scope = await visit(page, kind);
      await scope.getByTestId('outside').click();
      expect(await events(scope, 'outside')).toEqual([]);
      await open(scope);
      await scope.getByTestId('content').press('Escape');
      await expect(scope.getByTestId('content')).toBeHidden();
      await expect(scope.getByTestId('trigger')).toBeFocused();
      await scope.getByTestId('outside').click();
      expect(await events(scope, 'outside')).toEqual([]);
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });

    test('preserves consumer cancellation of Escape', async ({ page }) => {
      const scope = await visit(page, kind, { cancelEsc: '' });
      await open(scope);
      await scope.getByTestId('content').press('Escape');
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'close')).toEqual([]);
    });

    test('does not restore focus when returnFocusOnClose is false', async ({ page }) => {
      const scope = await visit(page, kind, { noReturnFocus: '' });
      await open(scope);
      await scope.getByTestId('focus-target').click();
      await expect(scope.getByTestId('content')).toBeHidden();
      await expect(scope.getByTestId('focus-target')).toBeFocused();
    });

    test('lets the controlled parent close and reopen without duplicate callbacks', async ({ page }) => {
      const scope = await visit(page, kind, { controlled: '', portalled: '' });
      for (let cycle = 1; cycle <= 2; cycle++) {
        await open(scope);
        await scope.getByTestId('outside').click();
        await expect(scope.getByTestId('content')).toBeHidden();
        expect(await events(scope, 'outside')).toHaveLength(cycle);
        expect(await events(scope, 'close')).toHaveLength(cycle);
      }
    });

    test('requests closure without overriding a fixed controlled isOpen', async ({ page }) => {
      const scope = await visit(page, kind, { controlled: '', holdOpen: '' });
      await open(scope);
      await scope.getByTestId('outside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      expect(await events(scope, 'outside')).toHaveLength(1);
      expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
    });

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

for (const environment of ['document', 'shadow']) {
  test(`Menu keeps dynamic deep portals internal and Escape closes only the current level (${environment})`, async ({ page }) => {
    const scope = await visit(page, 'menu', { environment, portalled: '' });
    await open(scope);
    await scope.getByRole('checkbox', { name: 'Mount submenu' }).check();
    await scope.getByTestId('submenu-trigger').press('ArrowRight');
    await expect(scope.getByTestId('submenu-content')).toBeVisible();
    await expect(scope.getByTestId('submenu-item')).toBeFocused();
    await scope.getByTestId('nested-trigger').press('ArrowRight');
    await expect(scope.getByTestId('nested-content')).toBeVisible();
    await expect(scope.getByTestId('nested-item')).toBeFocused();
    await scope.getByTestId('nested-item').click();
    await expect(scope.getByTestId('content')).toBeVisible();
    await expect(scope.getByTestId('nested-content')).toBeVisible();
    expect(await events(scope, 'outside')).toEqual([]);
    await scope.getByTestId('nested-item').press('Escape');
    await expect(scope.getByTestId('nested-content')).toBeHidden();
    await expect(scope.getByTestId('nested-trigger')).toBeFocused();
    await expect(scope.getByTestId('submenu-content')).toBeVisible();
    await scope.getByTestId('nested-trigger').press('Escape');
    await expect(scope.getByTestId('submenu-content')).toBeHidden();
    await expect(scope.getByTestId('submenu-trigger')).toBeFocused();
    await scope.getByRole('checkbox', { name: 'Mount submenu' }).uncheck();
    await scope.getByRole('checkbox', { name: 'Mount submenu' }).check();
    await scope.getByTestId('submenu-trigger').press('ArrowRight');
    await expect(scope.getByTestId('submenu-content')).toBeVisible();
    await expect(scope.getByTestId('submenu-item')).toBeFocused();
    await scope.getByTestId('submenu-item').click();
    expect(await events(scope, 'outside')).toEqual([]);
    await scope.getByTestId('outside').click();
    await expect(scope.getByTestId('content')).toBeHidden();
    expect(await events(scope, 'outside')).toHaveLength(1);
  });
}

test('Menu still closes on selection when closeOnSelect is enabled', async ({ page }) => {
  const scope = await visit(page, 'menu', { closeOnSelect: '' });
  await open(scope);
  await scope.getByTestId('inside').click();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover honors closeOnEsc=false without disabling outside dismissal', async ({ page }) => {
  const scope = await visit(page, 'popover', { noCloseOnEsc: '' });
  await open(scope);
  await scope.getByTestId('content').press('Escape');
  await expect(scope.getByTestId('content')).toBeVisible();
  expect(await events(scope, 'close')).toEqual([]);
  await scope.getByTestId('outside').click();
  await expect(scope.getByTestId('content')).toBeHidden();
});

test('Popover preserves hover trigger-to-content movement and leave dismissal', async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '' });
  await scope.getByTestId('trigger').hover();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('inside').hover();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('outside').hover();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover preserves hover-triggered keyboard focus and blur', async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '' });
  await scope.getByTestId('trigger').focus();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('focus-target').focus();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover does not report outside clicks in hover mode', async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '', controlled: '', holdOpen: '', initiallyOpen: '' });
  await scope.getByTestId('outside').click();
  await expect(scope.getByTestId('content')).toBeVisible();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover suppresses rendering and outside callbacks while disabled', async ({ page }) => {
  const scope = await visit(page, 'popover', { disabled: '', initiallyOpen: '' });
  await expect(scope.getByTestId('content')).toHaveCount(0);
  await scope.getByTestId('outside').click();
  expect(await events(scope, 'outside')).toEqual([]);
  expect(await events(scope, 'close')).toEqual([]);
});
