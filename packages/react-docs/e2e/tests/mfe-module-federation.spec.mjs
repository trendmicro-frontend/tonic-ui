// Module Federation integration: load dashboard and Inventory remotes into the
// shell document. Verify navigation/revisit, endpoint details, and Drawer close
// and Escape behavior without moving the portal into another DOM realm.

import { test, expect } from '@playwright/test';

test.describe('mfe-module-federation', () => {
  test('loads remotes and keeps the inventory drawer in the shell document', async ({ page }) => {
    await page.goto('index.html');
    await expect(page.getByText('Endpoint update status', { exact: true })).toBeVisible();
    await expect(page.getByText('OS distribution', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Inventory', exact: true }).click();
    const endpoint = page.getByRole('table').getByRole('button').first();
    await expect(endpoint).toBeVisible();
    const endpointName = await endpoint.innerText();
    await endpoint.click();

    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText('Detail profile', { exact: true })).toBeVisible();
    await expect(drawer.getByText(endpointName, { exact: true })).toBeVisible();
    expect(await drawer.evaluate(element => element.getRootNode() === document)).toBe(true);
    await drawer.getByRole('button', { name: 'Close', exact: true }).last().click();
    await expect(drawer).toBeHidden();

    await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
    await expect(page.getByText('Endpoint update status', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Inventory', exact: true }).click();
    await endpoint.click();
    await expect(drawer.getByText(endpointName, { exact: true })).toBeVisible();
    await drawer.press('Escape');
    await expect(drawer).toBeHidden();
  });
});
