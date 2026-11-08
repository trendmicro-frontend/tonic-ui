import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

for (const environment of ['document', 'shadow']) {
  test(`Menu keeps dynamic deep portals internal and Escape closes only the current level (${environment})`, { tag: ['@menu', '@interact-outside', '@portal', '@keyboard'] }, async ({ page }) => {
    const scope = await visit(page, 'menu', { environment, portalled: '' });
    await open(scope);
    const submenuCheckbox = scope.getByRole('checkbox', { name: 'Mount submenu' });
    // `Checkbox` keeps its state on a visually hidden input, so the label is the actionable control.
    await scope.getByTestId('submenu-control').click();
    await expect(submenuCheckbox).toBeChecked();
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
    await scope.getByTestId('submenu-control').click();
    await expect(submenuCheckbox).not.toBeChecked();
    await scope.getByTestId('submenu-control').click();
    await expect(submenuCheckbox).toBeChecked();
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

test('Menu still closes on selection when closeOnSelect is enabled', { tag: ['@menu', '@interact-outside'] }, async ({ page }) => {
  const scope = await visit(page, 'menu', { closeOnSelect: '' });
  await open(scope);
  await scope.getByTestId('inside').click();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});
