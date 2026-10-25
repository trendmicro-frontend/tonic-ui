import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

for (const environment of ['document', 'iframe']) {
  test(`Table scrolls overflowing rows and aligns its header (${environment})`, { tag: ['@table', '@scroll', '@boundary'] }, async ({ page }) => {
    const scope = await visit(page, 'table', { environment });
    const view = scope.getByTestId('table-scrollbar').locator(':scope > div').first();
    await view.hover();
    await page.mouse.wheel(100, 120);
    await expect.poll(() => view.evaluate(element => ({ left: element.scrollLeft > 0, top: element.scrollTop > 0 }))).toEqual({ left: true, top: true });
    const header = scope.getByTestId('table-header');
    await expect.poll(async () => Math.abs(await header.evaluate(element => element.scrollLeft) - await view.evaluate(element => element.scrollLeft))).toBeLessThan(1);
    const headerBox = await scope.getByTestId('header-0').boundingBox();
    const cellBox = await scope.getByTestId('cell-0-0').boundingBox();
    expect(cellBox.x).toBeCloseTo(headerBox.x, 0);
    const position = await view.evaluate(element => ({ left: element.scrollLeft, top: element.scrollTop }));
    const recorded = await events(scope, 'scroll');
    expect(recorded.at(-1)).toEqual({ type: 'scroll', ...position });
  });
}
