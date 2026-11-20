import { expect, test } from '@playwright/test';

test.describe('FormulaOne responsive typography', { tag: ['@docs', '@media', '@boundary'] }, () => {
  test('switches the real example at lg', async ({ page }) => {
    await page.setViewportSize({ width: 1023, height: 900 });
    await page.goto('./');

    const main = page.locator('#main');
    const id = main.getByText('240', { exact: true });
    const race = main.getByText('2 / 01:20.592', { exact: true });
    const name = main.getByText('Taiwan Leave System', { exact: true });
    const gate = main.getByText('REC', { exact: true }).first();

    for (const { width, sizes, lineHeights } of [
      { width: 1023, sizes: ['32px', '28px', '24px', '20px'], lineHeights: ['40px', '36px', '32px', '28px'] },
      { width: 1024, sizes: ['48px', '32px', '28px', '24px'], lineHeights: ['72px', '40px', '36px', '32px'] },
    ]) {
      await page.setViewportSize({ width, height: 900 });
      const fields = [id, race, name, gate];
      for (let index = 0; index < fields.length; index += 1) {
        await expect(fields[index]).toHaveCSS('font-size', sizes[index]);
        await expect(fields[index]).toHaveCSS('line-height', lineHeights[index]);
      }
    }
  });
});
