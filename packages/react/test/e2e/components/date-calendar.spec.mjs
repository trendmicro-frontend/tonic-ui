import { expect, test } from '@playwright/test';
import { visit } from '../helpers.mjs';

const monthLabel = (scope, label) => scope.getByText(label, { exact: true });
const day = (scope, date) => scope.locator(`[data-date="${date}"]`);

test.describe('DateCalendar', { tag: ['@date-calendar', '@keyboard', '@focus'] }, () => {
  test('uses the iframe document Tab keydown to return to the selected date', async ({ page }) => {
    const scope = await visit(page, 'date-calendar', { environment: 'iframe' });
    await scope.getByRole('button', { name: 'Next month' }).click();
    await expect(monthLabel(scope, 'Jul 2024')).toBeVisible();

    // The selected date is still June 15. Tab enters the July month view while
    // the iframe document has recorded the Tab keydown.
    await scope.getByRole('button', { name: 'Next month' }).focus();
    await page.keyboard.press('Tab');
    await expect(monthLabel(scope, 'Jun 2024')).toBeVisible();
  });

  test('resets the Tab key state on iframe document keyup', async ({ page }) => {
    const scope = await visit(page, 'date-calendar', { environment: 'iframe' });
    await scope.getByRole('button', { name: 'Next month' }).click();
    await expect(monthLabel(scope, 'Jul 2024')).toBeVisible();

    // Tab moves focus out of the month view so the keyup contract is exercised,
    // then the mouse focuses the month view. The disabled July day only takes
    // focus, so a stuck Tab state would redirect the view to June.
    await scope.getByRole('button', { name: 'Previous month' }).focus();
    await page.keyboard.press('Tab');
    await day(scope, '2024-07-10').click();
    await expect(monthLabel(scope, 'Jul 2024')).toBeVisible();
  });

  test('does not let the parent document keydown drive iframe focus', async ({ page }) => {
    const scope = await visit(page, 'date-calendar', { environment: 'iframe' });
    await scope.getByRole('button', { name: 'Next month' }).click();
    await expect(monthLabel(scope, 'Jul 2024')).toBeVisible();

    // A top-level button gives the parent document a deterministic native focus
    // target. Holding Tab keeps the keydown in the parent document; the keyup is
    // released only after the iframe has taken focus, matching a cross-document
    // Tab. A parent-owned listener would therefore stay stuck on Tab.
    await page.evaluate(() => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Parent focus target';
      document.body.appendChild(button);
      button.focus();
    });
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('BUTTON');
    await page.keyboard.down('Tab');
    await scope.getByRole('button', { name: 'Next month' }).focus();
    await day(scope, '2024-07-10').click();
    await expect(monthLabel(scope, 'Jul 2024')).toBeVisible();
    await page.keyboard.up('Tab');
  });
});
