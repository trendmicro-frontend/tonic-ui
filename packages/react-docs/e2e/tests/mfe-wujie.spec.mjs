import { test, expect } from '@playwright/test';

test.describe('mfe-wujie', () => {
  test('remounts sandbox apps and keeps the inventory drawer inside its shadow root', async ({ page }) => {
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
    // Wujie patches getRootNode() to expose the sandbox document. Check the
    // physical projection instead of comparing constructors across realms.
    expect(await drawer.evaluate(element =>
      Array.from(document.querySelectorAll('wujie-app'))
        .some(host => host.shadowRoot?.contains(element)))).toBe(true);
    await drawer.getByRole('button', { name: 'Close', exact: true }).last().click();
    await expect(drawer).toBeHidden();

    // Inventory destroys its sandbox on navigation; the next visit must mount
    // against the new shadow DOM instead of a detached element.
    await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
    await expect(page.getByText('Endpoint update status', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Inventory', exact: true }).click();
    await endpoint.click();
    await expect(drawer.getByText(endpointName, { exact: true })).toBeVisible();
    expect(await drawer.evaluate(element =>
      Array.from(document.querySelectorAll('wujie-app'))
        .some(host => host.shadowRoot?.contains(element)))).toBe(true);
    await drawer.getByRole('button', { name: 'Close', exact: true }).last().click();
    await expect(drawer).toBeHidden();
  });
});
