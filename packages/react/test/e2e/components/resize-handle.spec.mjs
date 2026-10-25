// ResizeHandle resolves its drag listeners through EnvironmentProvider, so the
// document that receives `mousemove`/`mouseup` is the environment's document,
// not the global one. These tests mount the real component in an iframe-owned
// React root, drive it with native input, and measure the visible box, which
// replaces the former ResizeHandle.environment.test.js listener spy.
import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

const INITIAL_WIDTH = 240;
const PANEL_HEIGHT = 160;
const DRAG_X = 64;
const TOUCH_DRAG_X = 56;

// React flushes state updates made from native listeners asynchronously; wait
// for two rendered frames instead of sleeping. The fixture is portalled into
// the iframe from the parent React root, so the parent document drives the
// update.
const settle = async (page) => {
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
};

// Element center in its own viewport coordinates, which is what the component
// reports through `clientX`/`clientY`.
const localCenterOf = async (locator) => {
  const center = await locator.evaluate((element) => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 };
  });
  return { x: Math.round(center.x), y: Math.round(center.y) };
};

// Top-level page coordinates of the element center, used for mouse input.
const pageCenterOf = async (locator) => {
  const box = await locator.boundingBox();
  return {
    x: Math.round(box.x + box.width / 2),
    y: Math.round(box.y + box.height / 2),
  };
};

// Origin of the iframe content viewport in top-level page coordinates. Mouse
// events are dispatched in page coordinates, while the callbacks report
// coordinates local to the iframe.
const iframeContentOrigin = (page) => page.evaluate(() => {
  const element = document.querySelector('iframe');
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  return {
    x: rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft),
    y: rect.top + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop),
  };
});

const panelWidth = async (panel) => (await panel.boundingBox()).width;

const coordinates = (entries) => entries.map(({ clientX, clientY }) => [clientX, clientY]);

test.describe('ResizeHandle', { tag: '@resize-handle' }, () => {
  test('resizes the iframe-owned box with the real mouse drag delta', { tag: ['@environment', '@boundary', '@geometry'] }, async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    const scope = await visit(page, 'resize-handle', { environment: 'iframe' });
    const panel = scope.getByTestId('resize-panel');
    const handle = scope.getByTestId('resize-handle');

    await expect(panel).toBeVisible();
    await expect(handle).toBeVisible();

    // The fixture really lives in the iframe document.
    expect(await panel.evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);
    expect(await handle.evaluate(element => element.ownerDocument !== window.parent.document)).toBe(true);

    const origin = await iframeContentOrigin(page);
    const localStart = await localCenterOf(handle);
    const start = { x: origin.x + localStart.x, y: origin.y + localStart.y };

    const initialBox = await panel.boundingBox();
    expect(initialBox.width).toBe(INITIAL_WIDTH);
    expect(initialBox.height).toBe(PANEL_HEIGHT);

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();

    await expect.poll(async () => coordinates(await events(scope, 'resizeStart'))).toEqual([
      [localStart.x, localStart.y],
    ]);
    expect(await events(scope, 'resize')).toEqual([]);

    await page.mouse.move(start.x + DRAG_X, start.y);

    await expect.poll(async () => coordinates(await events(scope, 'resize'))).toEqual([
      [localStart.x + DRAG_X, localStart.y],
    ]);

    // The visible border-box width follows the drag delta exactly, including
    // its padding and border, and the handle stays anchored to the right edge.
    await expect.poll(() => panelWidth(panel)).toBe(INITIAL_WIDTH + DRAG_X);
    const draggedBox = await panel.boundingBox();
    const draggedHandleBox = await handle.boundingBox();
    expect(draggedBox.x).toBeCloseTo(initialBox.x, 5);
    expect(draggedBox.y).toBeCloseTo(initialBox.y, 5);
    expect(draggedBox.height).toBeCloseTo(initialBox.height, 5);
    expect(draggedHandleBox.x).toBeCloseTo(draggedBox.x + draggedBox.width, 5);

    await page.mouse.up();
    await expect.poll(async () => coordinates(await events(scope, 'resizeEnd'))).toEqual([
      [localStart.x + DRAG_X, localStart.y],
    ]);

    // Released: further pointer movement in the same document must not resize.
    await page.mouse.move(start.x + DRAG_X * 2, start.y);
    await settle(page);
    expect(await events(scope, 'resize')).toHaveLength(1);
    expect(await events(scope, 'resizeEnd')).toHaveLength(1);
    expect(await panelWidth(panel)).toBe(INITIAL_WIDTH + DRAG_X);
  });

  test('keeps the drag in the iframe document across the parent boundary', { tag: ['@environment', '@boundary'] }, async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    const scope = await visit(page, 'resize-handle', { environment: 'iframe' });
    const panel = scope.getByTestId('resize-panel');
    const handle = scope.getByTestId('resize-handle');

    const origin = await iframeContentOrigin(page);
    const localStart = await localCenterOf(handle);
    const start = { x: origin.x + localStart.x, y: origin.y + localStart.y };
    expect((await panel.boundingBox()).width).toBe(INITIAL_WIDTH);

    // Real parent-document point below the iframe.
    const frameBox = await page.locator('iframe').boundingBox();
    const parentPoint = { x: 500, y: Math.round(frameBox.y + frameBox.height) + 120 };
    expect(parentPoint.y).toBeLessThan(1000);
    expect(await page.evaluate(({ x, y }) => {
      const element = document.elementFromPoint(x, y);
      return element !== null && element.ownerDocument === document && element.tagName !== 'IFRAME';
    }, parentPoint)).toBe(true);

    // Count native parent-document movement. While the button is held the
    // browser captures the pointer to the iframe, so this stays at zero and
    // the owning document receives the movement even outside its bounds.
    await page.evaluate(() => {
      window.__parentMoves = 0;
      document.addEventListener('mousemove', () => {
        window.__parentMoves += 1;
      });
    });

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await expect.poll(() => events(scope, 'resizeStart')).toHaveLength(1);

    const parentLocal = { x: parentPoint.x - origin.x, y: parentPoint.y - origin.y };
    await page.mouse.move(parentPoint.x, parentPoint.y);
    await expect.poll(async () => coordinates(await events(scope, 'resize'))).toEqual([
      [parentLocal.x, parentLocal.y],
    ]);
    await expect.poll(() => panelWidth(panel)).toBe(INITIAL_WIDTH + (parentLocal.x - localStart.x));
    await settle(page);
    expect(await page.evaluate(() => window.__parentMoves)).toBe(0);

    // The release is delivered to the owning document too, outside the iframe.
    await page.mouse.up();
    await expect.poll(async () => coordinates(await events(scope, 'resizeEnd'))).toEqual([
      [parentLocal.x, parentLocal.y],
    ]);

    // After release there is no capture: the same parent-document movement now
    // reaches the parent realm and must not resize the iframe-owned box.
    await page.evaluate(() => {
      window.__parentMoves = 0;
    });
    const widthAfterDrag = await panelWidth(panel);
    await page.mouse.move(parentPoint.x + 40, parentPoint.y);
    await expect.poll(() => page.evaluate(() => window.__parentMoves)).toBe(1);
    await settle(page);
    expect(await events(scope, 'resize')).toHaveLength(1);
    expect(await events(scope, 'resizeEnd')).toHaveLength(1);
    expect(await panelWidth(panel)).toBe(widthAfterDrag);
  });

  // Native touch input, not a synthetic TouchEvent: the browser's TouchList is
  // array-like, so this covers the real coordinate and geometry contract.
  test('resizes the box through native touch drag coordinates', { tag: ['@touch', '@geometry'] }, async ({ page }) => {
    const scope = await visit(page, 'resize-handle');
    const panel = scope.getByTestId('resize-panel');
    const handle = scope.getByTestId('resize-handle');

    const start = await pageCenterOf(handle);
    const initialBox = await panel.boundingBox();
    expect(initialBox.width).toBe(INITIAL_WIDTH);
    expect(initialBox.height).toBe(PANEL_HEIGHT);

    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: start.x, y: start.y }],
    });
    await expect.poll(async () => coordinates(await events(scope, 'resizeStart'))).toEqual([
      [start.x, start.y],
    ]);

    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: start.x + TOUCH_DRAG_X, y: start.y }],
    });
    await expect.poll(async () => coordinates(await events(scope, 'resize'))).toEqual([
      [start.x + TOUCH_DRAG_X, start.y],
    ]);
    await expect.poll(() => panelWidth(panel)).toBe(INITIAL_WIDTH + TOUCH_DRAG_X);
    const draggedBox = await panel.boundingBox();
    expect(draggedBox.x).toBeCloseTo(initialBox.x, 5);
    expect(draggedBox.y).toBeCloseTo(initialBox.y, 5);
    expect(draggedBox.height).toBeCloseTo(initialBox.height, 5);

    // `touchend` carries the released point in `changedTouches`; `touches` is
    // empty, which is what the public end callback must still report.
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect.poll(async () => coordinates(await events(scope, 'resizeEnd'))).toEqual([
      [start.x + TOUCH_DRAG_X, start.y],
    ]);
    await expect.poll(() => events(scope, 'resizeStart')).toHaveLength(1);
    await expect.poll(() => events(scope, 'resize')).toHaveLength(1);

    // Released: a separate native touch gesture elsewhere on the page must not
    // reach the removed document listeners.
    const panelCenter = await pageCenterOf(panel);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: panelCenter.x, y: panelCenter.y }],
    });
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: panelCenter.x + TOUCH_DRAG_X, y: panelCenter.y }],
    });
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await settle(page);
    expect(await events(scope, 'resizeStart')).toHaveLength(1);
    expect(await events(scope, 'resize')).toHaveLength(1);
    expect(await events(scope, 'resizeEnd')).toHaveLength(1);
    expect(await panelWidth(panel)).toBe(INITIAL_WIDTH + TOUCH_DRAG_X);

    await cdp.detach();
  });
});
