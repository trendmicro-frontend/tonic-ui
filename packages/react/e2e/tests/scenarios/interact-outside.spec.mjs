import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

test.describe('Menu and Popover', () => {
  for (const kind of ['menu', 'popover']) {
    test.describe(kind, { tag: ['@interact-outside', `@${kind}`] }, () => {
      test('dismisses on click, not mousedown, without a focus change; callbacks run once in order', { tag: '@focus' }, async ({ page }) => {
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

      test('keeps focus-only movement open and calls the consumer onBlur', { tag: '@focus' }, async ({ page }) => {
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
        test(`keeps content and trigger clicks internal (portalled=${portalled})`, { tag: '@portal' }, async ({ page }) => {
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

      test('ignores outside clicks while closed, including after Escape', { tag: ['@keyboard', '@lifecycle'] }, async ({ page }) => {
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

      test('preserves consumer cancellation of Escape', { tag: '@keyboard' }, async ({ page }) => {
        const scope = await visit(page, kind, { cancelEsc: '' });
        await open(scope);
        await scope.getByTestId('content').press('Escape');
        await expect(scope.getByTestId('content')).toBeVisible();
        expect(await events(scope, 'close')).toEqual([]);
      });

      test('does not restore focus when returnFocusOnClose is false', { tag: '@focus' }, async ({ page }) => {
        const scope = await visit(page, kind, { noReturnFocus: '' });
        await open(scope);
        await scope.getByTestId('focus-target').click();
        await expect(scope.getByTestId('content')).toBeHidden();
        await expect(scope.getByTestId('focus-target')).toBeFocused();
      });

      test('lets the controlled parent close and reopen without duplicate callbacks', { tag: '@lifecycle' }, async ({ page }) => {
        const scope = await visit(page, kind, { controlled: '', portalled: '' });
        for (let cycle = 1; cycle <= 2; cycle++) {
          await open(scope);
          await scope.getByTestId('outside').click();
          await expect(scope.getByTestId('content')).toBeHidden();
          expect(await events(scope, 'outside')).toHaveLength(cycle);
          expect(await events(scope, 'close')).toHaveLength(cycle);
        }
      });

      test('requests closure without overriding a fixed controlled isOpen', { tag: '@lifecycle' }, async ({ page }) => {
        const scope = await visit(page, kind, { controlled: '', holdOpen: '' });
        await open(scope);
        await scope.getByTestId('outside').click();
        await expect(scope.getByTestId('content')).toBeVisible();
        expect(await events(scope, 'outside')).toHaveLength(1);
        expect(await events(scope, 'close')).toEqual([{ type: 'close' }]);
      });
    });
  }
});

// Modal uses container-level React clicks; Drawer observes native document clicks.
test.describe('Modal and Drawer', () => {
  const backdropClick = { position: { x: 5, y: 5 } };

  const clickBackdrop = (scope) => {
    return scope.getByTestId('outside').click(backdropClick);
  };

  const outsideEntry = (target, defaultPrevented = false) => ({
    type: 'outside',
    eventType: 'click',
    target,
    cancelable: true,
    defaultPrevented,
  });

  for (const component of ['modal', 'drawer']) {
  // The Drawer overlay only spans the viewport with `backdrop`; the Modal
  // container is always full-screen. Modal ignores the extra flag.
    const overlay = component === 'drawer' ? { backdrop: 'true' } : {};

    test(`@${component} @lifecycle stays closed until the controlled parent opens it`, async ({ page }) => {
      const scope = await visit(page, component, overlay);
      await expect(scope.getByTestId('trigger')).toBeVisible();
      await expect(scope.getByTestId('content')).toHaveCount(0);
      await expect(scope.getByTestId('outside')).toHaveCount(0);

      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await expect(scope.getByTestId('outside')).toBeVisible();
      expect(await events(scope)).toEqual([{ type: 'open' }]);
    });

    test(`@${component} @interact-outside reports the interaction but keeps the default opt-out`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', ...overlay });
      await expect(scope.getByTestId('outside')).toBeVisible();
      await clickBackdrop(scope);

      expect(await events(scope)).toEqual([outsideEntry('outside')]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @interact-outside dismisses when closeOnInteractOutside is enabled`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });
      await clickBackdrop(scope);

      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([outsideEntry('outside'), { type: 'close' }]);
    });

    test(`@${component} @interact-outside keeps the dialog open for an explicit dismiss=false`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'false', ...overlay });
      await clickBackdrop(scope);

      expect(await events(scope)).toEqual([outsideEntry('outside')]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @interact-outside honors preventDefault from onInteractOutside`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', cancel: 'true', ...overlay });
      await clickBackdrop(scope);

      expect(await events(scope)).toEqual([outsideEntry('outside', true)]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @interact-outside applies live closeOnInteractOutside changes`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });
      const dismissControl = scope.getByTestId('dismiss-control');
      await expect(dismissControl).toBeChecked();

      await dismissControl.uncheck();
      await clickBackdrop(scope);
      expect(await events(scope)).toEqual([outsideEntry('outside')]);
      await expect(scope.getByTestId('content')).toBeVisible();

      await dismissControl.check();
      await clickBackdrop(scope);
      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([outsideEntry('outside'), outsideEntry('outside'), { type: 'close' }]);
    });

    test(`@${component} @interact-outside applies a live onInteractOutside replacement`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });
      const swapControl = scope.getByTestId('swap-control');

      await swapControl.check();
      await clickBackdrop(scope);
      expect(await events(scope)).toEqual([outsideEntry('outside', true)]);
      await expect(scope.getByTestId('content')).toBeVisible();

      await swapControl.uncheck();
      await clickBackdrop(scope);
      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([outsideEntry('outside', true), outsideEntry('outside'), { type: 'close' }]);
    });

    test(`@${component} @interact-outside does not treat clicks inside the content as outside`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });

      await scope.getByTestId('inside').click();
      await scope.getByTestId('inside').click();
      await expect(scope.getByTestId('inside-count')).toHaveText('2');
      await scope.getByTestId('content').click({ position: { x: 10, y: 10 } });

      expect(await events(scope)).toEqual([]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @interact-outside waits for the click, not the mousedown, to dismiss`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });
      const box = await scope.getByTestId('outside').boundingBox();
      expect(box).not.toBeNull();

      await page.mouse.move(box.x + 5, box.y + 5);
      await page.mouse.down();
      await expect(scope.getByTestId('events')).toHaveText('[]');
      await expect(scope.getByTestId('content')).toBeVisible();

      await page.mouse.up();
      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([outsideEntry('outside'), { type: 'close' }]);
    });

    test(`@${component} @keyboard ignores Escape while closeOnEsc is false`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', ...overlay });
      await scope.getByTestId('inside').click();
      await page.keyboard.press('Escape');

      expect(await events(scope)).toEqual([]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @keyboard closes on Escape only when it originates inside the dialog`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', closeOnEsc: 'true', ...overlay });

      // No focus has moved into the dialog, so the content keydown handler is not in the path.
      await page.keyboard.press('Escape');
      expect(await events(scope)).toEqual([]);
      await expect(scope.getByTestId('content')).toBeVisible();

      await scope.getByTestId('inside').click();
      await page.keyboard.press('Escape');
      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([{ type: 'close' }]);
    });

    test(`@${component} @lifecycle @interact-outside closes on acceptance and can be reopened`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay });

      await clickBackdrop(scope);
      await expect(scope.getByTestId('content')).toHaveCount(0);

      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();

      await clickBackdrop(scope);
      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([
        outsideEntry('outside'),
        { type: 'close' },
        { type: 'open' },
        outsideEntry('outside'),
        { type: 'close' },
      ]);
    });

    test(`@${component} @lifecycle @interact-outside respects a controlled parent that rejects onClose`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', holdOpen: 'true', ...overlay });

      await clickBackdrop(scope);
      expect(await events(scope)).toEqual([outsideEntry('outside'), { type: 'close' }]);
      await expect(scope.getByTestId('content')).toBeVisible();

      await clickBackdrop(scope);
      expect(await events(scope)).toEqual([
        outsideEntry('outside'),
        { type: 'close' },
        outsideEntry('outside'),
        { type: 'close' },
      ]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @interact-outside @portal keeps portalled descendants internal`, async ({ page }) => {
      const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', portalled: 'true', ...overlay });
      await scope.getByTestId('portal-child').click();

      expect(await events(scope)).toEqual([]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    for (const environment of ['document', 'shadow', 'iframe']) {
      test(`@${component} @lifecycle @interact-outside stops reporting outside interactions after closing (${environment})`, async ({ page }) => {
        const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay, environment });
        await clickBackdrop(scope);
        await expect(scope.getByTestId('content')).toHaveCount(0);
        await expect(scope.getByTestId('outside')).toHaveCount(0);

        const before = await events(scope);
        await scope.getByTestId('page-outside').click();
        expect(await events(scope)).toEqual(before);
      });
    }

    for (const environment of ['document', 'shadow', 'iframe']) {
      test(`@${component} @lifecycle releases outside handling after unmount (${environment})`, async ({ page }) => {
        const scope = await visit(page, component, { initiallyOpen: 'true', dismiss: 'true', ...overlay, environment });
        await expect(scope.getByTestId('outside')).toBeVisible();

        await scope.getByTestId('unmount').click();
        await expect(scope.getByTestId('outside')).toHaveCount(0);
        await expect(scope.getByTestId('content')).toHaveCount(0);
        await expect(scope.getByTestId('trigger')).toHaveCount(0);

        const before = await events(scope);
        await scope.getByTestId('page-outside').click();
        expect(await events(scope)).toEqual(before);

        // A remount recreates the fixture (and its document listener); the host log persists.
        await scope.getByTestId('remount').click();
        await expect(scope.getByTestId('trigger')).toHaveCount(1);
      });
    }

    test(`@${component} @deprecation lets closeOnOutsideClick=true override closeOnInteractOutside=false`, async ({ page }) => {
      const scope = await visit(page, component, {
        initiallyOpen: 'true',
        dismiss: 'false',
        legacy: 'root',
        legacyValue: 'true',
        ...overlay,
      });
      await clickBackdrop(scope);

      await expect(scope.getByTestId('content')).toHaveCount(0);
      expect(await events(scope)).toEqual([outsideEntry('outside'), { type: 'close' }]);
    });

    test(`@${component} @deprecation lets closeOnOutsideClick=false override closeOnInteractOutside=true`, async ({ page }) => {
      const scope = await visit(page, component, {
        initiallyOpen: 'true',
        dismiss: 'true',
        legacy: 'root',
        legacyValue: 'false',
        ...overlay,
      });
      await clickBackdrop(scope);

      expect(await events(scope)).toEqual([outsideEntry('outside')]);
      await expect(scope.getByTestId('content')).toBeVisible();
    });

    test(`@${component} @deprecation reports legacy-prop deprecation only in development`, async ({ page }) => {
      const warnings = [];
      page.on('console', (message) => {
        if (message.type() === 'error') {
          warnings.push(message.text());
        }
      });

      await visit(page, component, { legacy: 'root', legacyValue: 'true' });

      await expect
        .poll(() => warnings.filter(text => text.includes('closeOnOutsideClick') && text.includes('deprecated')).length)
        .toBe(process.env.E2E_NODE_ENV === 'production' ? 0 : 1);
    });
  }

  test('@modal @interact-outside only treats clicks inside its own container as outside', async ({ page }) => {
    const scope = await visit(page, 'modal', { initiallyOpen: 'true', dismiss: 'true' });

    // The host button is painted above the backdrop but is not part of the Modal React tree,
    // so the container click handler never sees it.
    await scope.getByTestId('page-outside').click();
    expect(await events(scope)).toEqual([]);
    await expect(scope.getByTestId('content')).toBeVisible();

    await clickBackdrop(scope);
    await expect(scope.getByTestId('content')).toHaveCount(0);
    expect(await events(scope)).toEqual([outsideEntry('outside'), { type: 'close' }]);
  });

  test('@drawer @interact-outside treats document clicks outside its content as outside', async ({ page }) => {
    const scope = await visit(page, 'drawer', { initiallyOpen: 'true', dismiss: 'true' });

    // Without `backdrop` the container only wraps the content, so the host button is
    // reachable and the document-level listener still reports it.
    await scope.getByTestId('page-outside').click();
    await expect(scope.getByTestId('content')).toHaveCount(0);
    expect(await events(scope)).toEqual([outsideEntry('page-outside'), { type: 'close' }]);
  });

  test('@modal @interact-outside dismisses a nested modal without closing its parent', async ({ page }) => {
    const scope = await visit(page, 'modal', { initiallyOpen: 'true', dismiss: 'true', nested: 'true' });
    await expect(scope.getByTestId('nested-outside')).toBeVisible();

    await scope.getByTestId('nested-outside').click(backdropClick);
    await expect(scope.getByTestId('nested-content')).toHaveCount(0);
    await expect(scope.getByTestId('content')).toBeVisible();
    expect(await events(scope)).toEqual([outsideEntry('nested-outside'), { type: 'close' }]);
  });
});
