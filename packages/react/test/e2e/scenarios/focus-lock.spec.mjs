// `Modal` and `Drawer` are the only components that wrap their content in
// `react-focus-lock`. The lock is disabled by default (`ensureFocus={false}`),
// so these contracts pin down when the trap is active, where focus lands on
// open, how Tab navigation is contained, and which element receives focus on
// close. Both fixtures are controlled parents: the trigger owns open and the
// backdrop click owns close.
import { expect, test } from '@playwright/test';
import { captureColorModes } from '../../../../../test/e2e/screenshots.mjs';
import { settleDialog, visit } from '../helpers.mjs';

const focusIsInsideContent = (page) =>
  page.evaluate(() => Boolean(document.activeElement?.closest('[data-testid="content"]')));

test.describe('Modal and Drawer focus lock', () => {
  for (const component of ['modal', 'drawer']) {
    // Drawer expands its overlay to the viewport only with `backdrop`; Modal ignores the flag.
    const overlay = component === 'drawer' ? { backdrop: 'true' } : {};

    test(`@${component} @focus does not steal focus while autoFocus is off`, { tag: [`@${component}`, '@focus'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();

      // `ensureFocus` traps focus but does not move it: nothing inside the dialog
      // is focused until the user presses Tab, and the trap then pulls the first
      // Tab into the content.
      expect(await focusIsInsideContent(page)).toBe(false);
      await page.keyboard.press('Tab');
      await expect(scope.getByTestId('inside')).toBeFocused();
    });

    test(`@${component} @focus autoFocus focuses the first focusable element in the content`, { tag: [`@${component}`, '@focus'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', autoFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();

      await expect(scope.getByTestId('inside')).toBeFocused();
    });

    // Visual evidence of the locked dialog: every case is recorded in both colour
    // modes with the same props, so light and dark can be compared as a pair.
    test(`@${component} @focus @color-mode records the locked dialog in light and dark`, { tag: [`@${component}`, '@focus', '@color-mode'] }, async ({ page }) => {
      await captureColorModes(page, 'focus-lock', `${component}-locked`, async (colorMode) => {
        const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', autoFocus: 'true', colorMode });
        await scope.getByTestId('trigger').click();
        await expect(scope.getByTestId('content')).toBeVisible();
        await expect(scope.getByTestId('inside')).toBeFocused();
        await settleDialog(scope);
      });
    });

    test(`@${component} @focus initialFocusRef overrides the autoFocus order`, { tag: [`@${component}`, '@focus'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', autoFocus: 'true', initialFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();

      await expect(scope.getByRole('checkbox', { name: 'Dismiss on outside click' })).toBeFocused();
    });

    test(`@${component} @focus @keyboard wraps Tab navigation inside the content`, { tag: [`@${component}`, '@focus', '@keyboard'] }, async ({ page }) => {
      await captureColorModes(page, 'focus-lock', `${component}-trap`, async (colorMode) => {
        const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', colorMode });
        await scope.getByTestId('trigger').click();
        await expect(scope.getByTestId('content')).toBeVisible();
        await settleDialog(scope);
        await scope.getByTestId('inside').click();

        // The content owns exactly three focusable elements, so the third Tab must
        // wrap back to the first one instead of reaching the page chrome.
        for (let step = 0; step < 3; step++) {
          await page.keyboard.press('Tab');
          expect(await focusIsInsideContent(page)).toBe(true);
        }
        await expect(scope.getByTestId('inside')).toBeFocused();

        for (let step = 0; step < 3; step++) {
          await page.keyboard.press('Shift+Tab');
          expect(await focusIsInsideContent(page)).toBe(true);
        }
        await expect(scope.getByTestId('inside')).toBeFocused();
      });
    });

    for (const environment of ['document', 'shadow', 'iframe']) {
      test(`@${component} @focus @keyboard keeps Tab away from the page chrome (${environment})`, { tag: [`@${component}`, '@focus', '@keyboard'] }, async ({ page }) => {
        const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', autoFocus: 'true', environment });
        await scope.getByTestId('trigger').click();
        await expect(scope.getByTestId('content')).toBeVisible();

        // The dialog subtree owns the keyboard cycle; the shell controls outside it
        // must never receive focus. The lock's own trap element may be focused
        // transiently, so the assertion is on the chrome, not on a specific element.
        for (let step = 0; step < 6; step++) {
          await page.keyboard.press('Tab');
          await expect(scope.getByTestId('page-outside')).not.toBeFocused();
          await expect(scope.getByTestId('focus-target')).not.toBeFocused();
        }
      });
    }

    test(`@${component} @focus restores focus inside the content after an outside click`, { tag: [`@${component}`, '@focus'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await scope.getByTestId('inside').click();

      // `page-outside` is page chrome, not part of the dialog. `closeOnInteractOutside`
      // defaults to false, so the dialog stays open and the lock pulls focus back.
      await scope.getByTestId('page-outside').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await expect(scope.getByTestId('inside')).toBeFocused();
    });

    test(`@${component} @focus lets focus leave when ensureFocus is false`, { tag: [`@${component}`, '@focus'] }, async ({ page }) => {
      await captureColorModes(page, 'focus-lock', `${component}-unlocked`, async (colorMode) => {
        const scope = await visit(page, component, { ...overlay, colorMode });
        await scope.getByTestId('trigger').click();
        await expect(scope.getByTestId('content')).toBeVisible();
        await settleDialog(scope);
        await scope.getByTestId('inside').click();

        // Without the lock, Tab runs past the content into the surrounding page.
        for (let step = 0; step < 3; step++) {
          await page.keyboard.press('Tab');
        }
        expect(await focusIsInsideContent(page)).toBe(false);
        await page.keyboard.press('Tab');
        await expect(scope.getByTestId('trigger')).toBeFocused();
      });
    });

    test(`@${component} @focus @lifecycle returns focus to the trigger on close`, { tag: [`@${component}`, '@focus', '@lifecycle'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', dismiss: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await scope.getByTestId('inside').click();

      await scope.getByTestId('outside').click({ position: { x: 5, y: 5 } });
      await expect(scope.getByTestId('content')).toHaveCount(0);
      await expect(scope.getByTestId('trigger')).toBeFocused();
    });

    test(`@${component} @focus @lifecycle does not restore focus with returnFocusOnClose={false}`, { tag: [`@${component}`, '@focus', '@lifecycle'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', dismiss: 'true', noReturnFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await scope.getByTestId('inside').click();

      await scope.getByTestId('outside').click({ position: { x: 5, y: 5 } });
      await expect(scope.getByTestId('content')).toHaveCount(0);
      await expect(scope.getByTestId('trigger')).not.toBeFocused();
    });

    test(`@${component} @focus @lifecycle finalFocusRef receives focus on close`, { tag: [`@${component}`, '@focus', '@lifecycle'] }, async ({ page }) => {
      const scope = await visit(page, component, { ...overlay, ensureFocus: 'true', dismiss: 'true', finalFocus: 'true' });
      await scope.getByTestId('trigger').click();
      await expect(scope.getByTestId('content')).toBeVisible();
      await scope.getByTestId('inside').click();

      await scope.getByTestId('outside').click({ position: { x: 5, y: 5 } });
      await expect(scope.getByTestId('content')).toHaveCount(0);
      await expect(scope.getByTestId('final-target')).toBeFocused();
    });
  }
});
