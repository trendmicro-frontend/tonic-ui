// Real-browser replacements for the jsdom environment tests that mocked
// `ResizeObserver` / `MutationObserver` / document listeners. The observers,
// geometry, scroll clamping, and drag events are native; `installObserverProbe`
// only records which realm (top document vs fixture iframe) supplied the
// constructor and which document owns the drag listeners.
import { expect, test } from '@playwright/test';
import { events, installObserverProbe, observerProbe, visit } from '../helpers.mjs';

const modalGeometry = (scope) => scope.getByTestId('overlay').evaluate((overlay) => {
  const container = overlay.parentElement;
  const content = container.querySelector('[data-testid="modal-content"]');
  const overlayRect = overlay.getBoundingClientRect();
  return {
    containerHeight: container.offsetHeight,
    containerWidth: container.offsetWidth,
    contentHeight: content.offsetHeight,
    contentWidth: content.offsetWidth,
    inTopDocument: overlay.ownerDocument === window.top.document,
    overlayHeight: overlay.style.height,
    overlayRectHeight: overlayRect.height,
    overlayRectWidth: overlayRect.width,
    overlayWidth: overlay.style.width,
  };
});

const expectOverlayToCoverContent = async (scope) => {
  await expect.poll(async () => {
    const geometry = await modalGeometry(scope);
    return geometry.overlayWidth === `${geometry.contentWidth}px` &&
      geometry.overlayHeight === `${geometry.contentHeight}px`;
  }).toBe(true);

  const geometry = await modalGeometry(scope);
  // The content really overflows the modal container, so the overlay only
  // covers it by growing beyond the container's 100% box.
  expect(geometry.contentWidth).toBeGreaterThan(geometry.containerWidth);
  expect(geometry.contentHeight).toBeGreaterThan(geometry.containerHeight);
  expect(Math.round(geometry.overlayRectWidth)).toBe(geometry.contentWidth);
  expect(Math.round(geometry.overlayRectHeight)).toBe(geometry.contentHeight);
};

const expectOverlayToFitContainer = async (scope) => {
  await expect.poll(async () => {
    const geometry = await modalGeometry(scope);
    return {
      height: geometry.overlayHeight,
      width: geometry.overlayWidth,
    };
  }).toEqual({ height: '', width: '' });

  const geometry = await modalGeometry(scope);
  expect(geometry.contentWidth).toBeLessThanOrEqual(geometry.containerWidth);
  expect(geometry.contentHeight).toBeLessThanOrEqual(geometry.containerHeight);
  expect(Math.round(geometry.overlayRectWidth)).toBe(geometry.containerWidth);
  expect(Math.round(geometry.overlayRectHeight)).toBe(geometry.containerHeight);
};

const scrollbarGeometry = (scope) => scope.getByTestId('scroll-view').evaluate((view) => {
  const root = view.parentElement;
  const track = root.querySelector('[data-scrollbar-track="vertical"]');
  const thumb = root.querySelector('[data-scrollbar-thumb="vertical"]');
  return {
    clientHeight: view.clientHeight,
    clientWidth: view.clientWidth,
    scrollHeight: view.scrollHeight,
    scrollLeft: view.scrollLeft,
    scrollTop: view.scrollTop,
    scrollWidth: view.scrollWidth,
    thumbHeight: parseFloat(thumb.style.height),
    trackHeight: track.clientHeight,
  };
});

const expectedThumbHeight = (geometry) => Math.max(
  32, // the default `minThumbHeight`
  Math.ceil((geometry.clientHeight / geometry.scrollHeight) * geometry.trackHeight),
);

// Provenance is scoped to the observed node: the observer watching it must have
// been constructed by the iframe's native constructor, not the global one.
// Unrelated top-realm observers created by framework/tooling do not matter.
const expectObservedInIframe = (snapshot, name, targetTestId) => {
  const realms = snapshot.observed
    .filter(entry => entry.name === name && entry.targetTestId === targetTestId)
    .map(entry => entry.realm);
  expect(realms.length).toBeGreaterThan(0);
  expect(realms.every(realm => realm === 'iframe')).toBe(true);
};

const expectThumbToMatchGeometry = async (scope) => {
  await expect.poll(async () => {
    const geometry = await scrollbarGeometry(scope);
    return geometry.thumbHeight === expectedThumbHeight(geometry);
  }).toBe(true);
};

test.describe('ModalOverlay', { tag: ['@modal', '@observers'] }, () => {
  test('covers overflowing content and follows content shrink and growth', async ({ page }) => {
    const scope = await visit(page, 'browser-observers', { subject: 'modal' });
    await expect(scope.getByTestId('overlay')).toBeVisible();

    await expectOverlayToCoverContent(scope);

    await scope.getByTestId('shrink-modal-content').click();
    await expectOverlayToFitContainer(scope);

    await scope.getByTestId('grow-modal-content').click();
    await expectOverlayToCoverContent(scope);
  });

  test('observes content resizes with the iframe window ResizeObserver', async ({ page }) => {
    await installObserverProbe(page);
    const scope = await visit(page, 'browser-observers', { subject: 'modal', environment: 'iframe' });
    await expect(scope.getByTestId('overlay')).toBeVisible();

    const geometry = await modalGeometry(scope);
    expect(geometry.inTopDocument).toBe(false);

    await expectOverlayToCoverContent(scope);

    const before = await observerProbe(page);
    // The overlay's observer must come from the environment window (the iframe),
    // never from the global window the component runs in.
    expect(before.observers.ResizeObserver.constructed.iframe).toBeGreaterThanOrEqual(1);
    expectObservedInIframe(before, 'ResizeObserver', 'modal-content');

    await scope.getByTestId('shrink-modal-content').click();
    await expectOverlayToFitContainer(scope);

    const after = await observerProbe(page);
    expect(after.observers.ResizeObserver.callbacks.iframe).toBeGreaterThan(before.observers.ResizeObserver.callbacks.iframe);
  });
});

test.describe('Scrollbar', { tag: ['@scrollbar', '@observers'] }, () => {
  test('updates the thumb from the iframe observers after a real root resize and content mutation', async ({ page }) => {
    await installObserverProbe(page);
    const scope = await visit(page, 'browser-observers', { subject: 'scrollbar', environment: 'iframe' });
    const thumb = scope.locator('[data-scrollbar-thumb="vertical"]');
    await expect(thumb).toBeVisible();

    await expectThumbToMatchGeometry(scope);
    const initial = await scrollbarGeometry(scope);
    expect(initial.clientHeight).toBe(200);
    expect(initial.scrollHeight).toBe(600);
    expect(initial.thumbHeight).toBe(expectedThumbHeight(initial));

    const before = await observerProbe(page);
    expect(before.observers.ResizeObserver.constructed.iframe).toBeGreaterThanOrEqual(1);
    expect(before.observers.MutationObserver.constructed.iframe).toBeGreaterThanOrEqual(1);
    expectObservedInIframe(before, 'ResizeObserver', 'scrollbar-root');
    expectObservedInIframe(before, 'MutationObserver', 'scrollbar-root');

    // ResizeObserver: the frame changes the Scrollbar root's box without
    // mutating anything inside it, so only the observed resize can recompute
    // the thumb.
    await scope.getByTestId('grow-scrollbar-frame').click();
    await expect.poll(async () => (await scrollbarGeometry(scope)).clientHeight).toBe(320);
    await expectThumbToMatchGeometry(scope);
    const resized = await scrollbarGeometry(scope);
    expect(resized.scrollHeight).toBe(initial.scrollHeight);
    expect(resized.thumbHeight).not.toBe(initial.thumbHeight);
    const afterResize = await observerProbe(page);
    expect(afterResize.observers.ResizeObserver.callbacks.iframe).toBeGreaterThan(before.observers.ResizeObserver.callbacks.iframe);

    // MutationObserver: a child added inside the observed subtree changes the
    // scrollable size while the root box stays the same, so only the observed
    // mutation can recompute the thumb.
    const beforeMutation = await observerProbe(page);
    await scope.getByTestId('add-scrollbar-content').click();
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollHeight).toBe(900);
    await expectThumbToMatchGeometry(scope);
    const mutated = await scrollbarGeometry(scope);
    expect(mutated.clientHeight).toBe(resized.clientHeight);
    expect(mutated.trackHeight).toBe(resized.trackHeight);
    expect(mutated.thumbHeight).not.toBe(resized.thumbHeight);
    const afterMutation = await observerProbe(page);
    expect(afterMutation.observers.MutationObserver.callbacks.iframe).toBeGreaterThan(beforeMutation.observers.MutationObserver.callbacks.iframe);
    expect(afterMutation.observers.ResizeObserver.callbacks.iframe).toBe(beforeMutation.observers.ResizeObserver.callbacks.iframe);

    await scope.getByTestId('remove-scrollbar-content').click();
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollHeight).toBe(600);
    await expectThumbToMatchGeometry(scope);
    expect((await scrollbarGeometry(scope)).thumbHeight).toBe(resized.thumbHeight);
    const afterRemoval = await observerProbe(page);
    expect(afterRemoval.observers.MutationObserver.callbacks.iframe).toBeGreaterThan(afterMutation.observers.MutationObserver.callbacks.iframe);

    // A content resize (class/style mutation on a descendant) also changes the
    // scrollable size without resizing the Scrollbar root.
    const beforeContentResize = await observerProbe(page);
    await scope.getByTestId('resize-scrollbar-content').click();
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollHeight).toBe(1000);
    await expectThumbToMatchGeometry(scope);
    const contentResized = await scrollbarGeometry(scope);
    expect(contentResized.clientHeight).toBe(resized.clientHeight);
    expect(contentResized.trackHeight).toBe(resized.trackHeight);
    expect(contentResized.thumbHeight).not.toBe(resized.thumbHeight);
    const afterContentResize = await observerProbe(page);
    expect(afterContentResize.observers.MutationObserver.callbacks.iframe).toBeGreaterThan(beforeContentResize.observers.MutationObserver.callbacks.iframe);
    expect(afterContentResize.observers.ResizeObserver.callbacks.iframe).toBe(beforeContentResize.observers.ResizeObserver.callbacks.iframe);
  });

  test('drags the thumb from the iframe document and stops after mouseup', async ({ page }) => {
    await installObserverProbe(page);
    const scope = await visit(page, 'browser-observers', { subject: 'scrollbar', environment: 'iframe' });
    const thumb = scope.locator('[data-scrollbar-thumb="vertical"]');
    await expect(thumb).toBeVisible();
    await expectThumbToMatchGeometry(scope);

    const geometry = await scrollbarGeometry(scope);
    expect(geometry.scrollTop).toBe(0);

    const thumbBox = await thumb.boundingBox();
    const startX = thumbBox.x + thumbBox.width / 2;
    const startY = thumbBox.y + thumbBox.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();

    // The drag listeners must be registered on the iframe's document, not the
    // global document the component code runs in.
    await expect.poll(async () => {
      const { listeners } = await observerProbe(page);
      const active = listeners.filter(entry => entry.active && entry.realm === 'iframe');
      return {
        mousemove: active.some(entry => entry.type === 'mousemove'),
        mouseup: active.some(entry => entry.type === 'mouseup'),
      };
    }).toEqual({ mousemove: true, mouseup: true });
    const duringDrag = await observerProbe(page);
    expect(duringDrag.listeners.filter(entry => entry.active && entry.realm === 'top')).toEqual([]);

    const delta = 40;
    const expectedFirst = delta / (geometry.trackHeight - geometry.thumbHeight) * (geometry.scrollHeight - geometry.clientHeight);
    await page.mouse.move(startX, startY + delta);
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollTop).toBeGreaterThan(0);
    const first = (await scrollbarGeometry(scope)).scrollTop;
    expect(Math.abs(first - expectedFirst)).toBeLessThanOrEqual(2);

    await page.mouse.move(startX, startY + delta * 2);
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollTop).toBeGreaterThan(first);
    const second = (await scrollbarGeometry(scope)).scrollTop;
    expect(second).toBeGreaterThan(first);

    await page.mouse.up();
    await expect.poll(async () => {
      const { listeners } = await observerProbe(page);
      return listeners.some(entry => entry.active && entry.realm === 'iframe' && (entry.type === 'mousemove' || entry.type === 'mouseup'));
    }).toBe(false);

    // A released drag must not keep scrolling.
    const released = (await scrollbarGeometry(scope)).scrollTop;
    await page.mouse.move(startX, startY + delta * 3);
    await scope.getByTestId('scroll-view').evaluate(() => new Promise(requestAnimationFrame));
    expect((await scrollbarGeometry(scope)).scrollTop).toBe(released);
  });

  test('applies controlled scrollLeft and scrollTop through native scrolling', async ({ page }) => {
    const scope = await visit(page, 'browser-observers', { subject: 'scrollbar', controlled: '' });
    const geometry = await scrollbarGeometry(scope);
    expect(geometry.scrollWidth - geometry.clientWidth).toBe(200);
    expect(geometry.scrollHeight - geometry.clientHeight).toBe(200);

    await expect.poll(async () => {
      const values = await scrollbarGeometry(scope);
      return [values.scrollLeft, values.scrollTop];
    }).toEqual([100, 100]);

    await scope.getByTestId('scroll-to-150').click();
    await expect.poll(async () => {
      const values = await scrollbarGeometry(scope);
      return [values.scrollLeft, values.scrollTop];
    }).toEqual([150, 150]);

    // Real native clamping: 500 exceeds the 200px scrollable range.
    await scope.getByTestId('scroll-to-500').click();
    await expect.poll(async () => {
      const values = await scrollbarGeometry(scope);
      return [values.scrollLeft, values.scrollTop];
    }).toEqual([200, 200]);
  });

  test('restores the real scroll position after remount', async ({ page }) => {
    const scope = await visit(page, 'browser-observers', { subject: 'scrollbar', restore: '' });
    const view = scope.getByTestId('scroll-view');
    await expect(view).toBeVisible();
    await expectThumbToMatchGeometry(scope);

    // Native wheel scrolling over the scroll view, not a synthetic scroll event.
    await view.hover();
    await page.mouse.wheel(0, 100);
    await expect.poll(async () => (await scrollbarGeometry(scope)).scrollTop).toBeGreaterThan(0);
    const scrolled = (await scrollbarGeometry(scope)).scrollTop;

    // `onUpdate` reports the native scroll position.
    await expect.poll(async () => (
      (await events(scope, 'update')).some(entry => Math.abs(entry.scrollTop - scrolled) <= 1)
    )).toBe(true);

    await scope.getByTestId('toggle-scrollbar').click();
    await expect(scope.locator('[data-scrollbar-thumb="vertical"]')).toHaveCount(0);

    await scope.getByTestId('toggle-scrollbar').click();
    await expect(scope.locator('[data-scrollbar-thumb="vertical"]')).toBeVisible();
    await expect.poll(async () => Math.abs((await scrollbarGeometry(scope)).scrollTop - scrolled) <= 1).toBe(true);
    await expectThumbToMatchGeometry(scope);
  });
});
