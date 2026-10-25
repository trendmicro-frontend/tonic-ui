// Collapse and Grow derive their animation from real layout: Collapse measures
// the content height on enter and again when the exit transition starts, and
// Grow derives its `timeout="auto"` duration from `clientHeight`. jsdom has no
// layout, so these contracts only exist in a browser. The recorder listens to
// native CSS transition events (including `transitioncancel`, because Collapse
// switches to `height: auto` when the transition times out) instead of sleeping
// or mocking height APIs.
import { expect, test } from '@playwright/test';
import { events, visit } from '../helpers.mjs';

const installTransitionRecorder = async (page) => {
  await page.addInitScript(() => {
    window.__transitionLog = [];
    const capture = (event) => {
      const element = event.target;
      if (!element.dataset || !element.dataset.testid) {
        return;
      }
      const style = getComputedStyle(element);
      window.__transitionLog.push({
        animations: element.getAnimations().map(animation => ({
          keyframes: animation.effect.getKeyframes().map(frame => ({
            height: frame.height,
            offset: frame.computedOffset,
            opacity: frame.opacity,
            transform: frame.transform,
          })),
          property: animation.transitionProperty,
        })),
        elapsedTime: event.elapsedTime,
        height: style.height,
        opacity: style.opacity,
        overflow: style.overflow,
        property: event.propertyName,
        testId: element.dataset.testid,
        transform: style.transform,
        transitionDelay: style.transitionDelay,
        transitionDuration: style.transitionDuration,
        type: event.type,
        visibility: style.visibility,
      });
    };
    document.addEventListener('transitionrun', capture, true);
    document.addEventListener('transitionend', capture, true);
    document.addEventListener('transitioncancel', capture, true);
  });
};

const transitionLog = (page, testId) => page.evaluate(
  id => window.__transitionLog.filter(entry => entry.testId === id),
  testId,
);

const transitionRun = (entries, property) => entries.find(
  entry => entry.type === 'transitionrun' && entry.property === property,
);

const transitionEnd = (entries, property) => entries.find(
  entry => entry.type === 'transitionend' && entry.property === property,
);

// Collapse flips `height` to `auto` when the enter timeout fires. If that wins
// the race against the transition's own completion, the height transition is
// cancelled instead of ending, so the last height event is either one.
const heightCompletion = (entries) => {
  const completions = entries.filter(entry => (
    entry.property === 'height' &&
    (entry.type === 'transitionend' || entry.type === 'transitioncancel')
  ));
  return completions[completions.length - 1];
};

const keyframesOf = (entry, property) => entry.animations
  .find(animation => animation.property === property)
  .keyframes;

const heightKeyframes = (entry) => keyframesOf(entry, 'height').map(frame => frame.height);
const opacityKeyframes = (entry) => keyframesOf(entry, 'opacity').map(frame => frame.opacity);
const transformKeyframes = (entry) => keyframesOf(entry, 'transform').map(frame => frame.transform);

const heightOf = (entry) => Number.parseFloat(entry.height);

// A sampled `transitionrun` value is already an early interpolation step (for
// example 0.72px on a 0 -> 100px height transition), never the exact boundary.
const expectEnteringHeight = (entry, from, to) => {
  const height = heightOf(entry);
  expect(height).toBeGreaterThanOrEqual(from);
  expect(height).toBeLessThan(to);
};

const expectExitingHeight = (entry, from, to) => {
  const height = heightOf(entry);
  expect(height).toBeGreaterThan(to);
  expect(height).toBeLessThanOrEqual(from);
};

// `elapsedTime` proves the browser ran the transition for its real duration
// rather than jumping to the end state.
const expectElapsed = (entry, expectedSeconds) => {
  expect(entry.elapsedTime).toBeGreaterThanOrEqual(expectedSeconds * 0.8);
  expect(entry.elapsedTime).toBeLessThan(expectedSeconds + 0.5);
};

// `transform: none` and `transform: scale(1, 1)` both mean an unscaled box.
const scaleOf = (transform) => {
  if (transform === 'none') {
    return [1, 1];
  }
  const values = transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(Number);
  return [values[0], values[3]];
};

test.describe('Collapse', { tag: '@collapse' }, () => {
  test('expands to the measured content height and collapses back to zero', { tag: ['@transition', '@geometry'] }, async ({ page }) => {
    await installTransitionRecorder(page);
    const scope = await visit(page, 'collapse');
    const collapse = scope.getByTestId('collapse');

    // Exited: zero height, transparent and hidden.
    await expect(collapse).toHaveCSS('height', '0px');
    await expect(collapse).toHaveCSS('opacity', '0');
    await expect(collapse).toHaveCSS('visibility', 'hidden');

    await scope.getByTestId('toggle').click();
    await expect.poll(async () => (await events(scope, 'entered')).length).toBe(1);
    await expect.poll(() => collapse.evaluate(element => element.getAnimations().length)).toBe(0);
    const enter = await transitionLog(page, 'collapse');

    // Entering targets the real 100px content height, clips the overflow and
    // stays visible. The target comes from the animation keyframes so it does
    // not depend on whether the transition ends or is cancelled by `auto`.
    const enterRun = transitionRun(enter, 'height');
    expect(heightKeyframes(enterRun)).toEqual(['0px', '100px']);
    expectEnteringHeight(enterRun, 0, 100);
    expect(enterRun.overflow).toBe('hidden');
    expect(enterRun.visibility).toBe('visible');
    const enterCompletion = heightCompletion(enter);
    expect(['transitionend', 'transitioncancel']).toContain(enterCompletion.type);
    expect(heightOf(enterCompletion)).toBeGreaterThan(99);
    expect(heightOf(enterCompletion)).toBeLessThanOrEqual(100);
    expectElapsed(enterCompletion, 0.3);

    // Entered: `height: auto` follows the content instead of the measured value.
    await expect(collapse).toHaveCSS('height', '100px');
    await expect(collapse).toHaveCSS('opacity', '1');
    await expect(collapse).toHaveCSS('visibility', 'visible');
    await scope.getByTestId('resize').click();
    await expect(collapse).toHaveCSS('height', '160px');

    const exitStart = enter.length;
    await scope.getByTestId('toggle').click();
    await expect.poll(async () => (await events(scope, 'exited')).length).toBe(1);
    await expect.poll(async () => (
      (await transitionLog(page, 'collapse')).slice(exitStart).some(entry => (
        entry.property === 'height' &&
        (entry.type === 'transitionend' || entry.type === 'transitioncancel')
      ))
    )).toBe(true);
    const exit = (await transitionLog(page, 'collapse')).slice(exitStart);

    // Exiting starts from the height measured at that moment (160px), not from
    // the height captured when the component first entered.
    const exitRun = transitionRun(exit, 'height');
    expect(heightKeyframes(exitRun)).toEqual(['160px', '0px']);
    expectExitingHeight(exitRun, 160, 0);
    expect(exitRun.overflow).toBe('hidden');
    expect(exitRun.visibility).toBe('visible');
    const exitCompletion = heightCompletion(exit);
    expect(exitCompletion.type).toBe('transitionend');
    expect(heightOf(exitCompletion)).toBe(0);
    expectElapsed(exitCompletion, 0.3);

    await expect(collapse).toHaveCSS('height', '0px');
    await expect(collapse).toHaveCSS('opacity', '0');
    await expect(collapse).toHaveCSS('visibility', 'hidden');

    expect((await events(scope)).map(entry => entry.type)).toEqual([
      'open', 'enter', 'entering', 'entered',
      'close', 'exit', 'exiting', 'exited',
    ]);
  });

  test('collapses to a visible collapsedHeight instead of hiding', { tag: ['@transition', '@boundary'] }, async ({ page }) => {
    await installTransitionRecorder(page);
    const scope = await visit(page, 'collapse', { collapsedHeight: 24 });
    const collapse = scope.getByTestId('collapse');

    await expect(collapse).toHaveCSS('height', '24px');
    await expect(collapse).toHaveCSS('opacity', '0');
    await expect(collapse).toHaveCSS('visibility', 'visible');

    await scope.getByTestId('toggle').click();
    await expect.poll(async () => (await events(scope, 'entered')).length).toBe(1);
    await expect.poll(() => collapse.evaluate(element => element.getAnimations().length)).toBe(0);
    const enter = await transitionLog(page, 'collapse');

    const enterRun = transitionRun(enter, 'height');
    expect(heightKeyframes(enterRun)).toEqual(['24px', '100px']);
    expectEnteringHeight(enterRun, 24, 100);
    const enterCompletion = heightCompletion(enter);
    expect(['transitionend', 'transitioncancel']).toContain(enterCompletion.type);
    expect(heightOf(enterCompletion)).toBeGreaterThan(99);
    expect(heightOf(enterCompletion)).toBeLessThanOrEqual(100);

    const exitStart = enter.length;
    await scope.getByTestId('toggle').click();
    await expect.poll(async () => (await events(scope, 'exited')).length).toBe(1);
    await expect.poll(async () => (
      (await transitionLog(page, 'collapse')).slice(exitStart).some(entry => (
        entry.property === 'height' &&
        (entry.type === 'transitionend' || entry.type === 'transitioncancel')
      ))
    )).toBe(true);
    const exit = (await transitionLog(page, 'collapse')).slice(exitStart);

    const exitRun = transitionRun(exit, 'height');
    expect(heightKeyframes(exitRun)).toEqual(['100px', '24px']);
    expectExitingHeight(exitRun, 100, 24);
    const exitCompletion = heightCompletion(exit);
    expect(exitCompletion.type).toBe('transitionend');
    expect(heightOf(exitCompletion)).toBe(24);

    await expect(collapse).toHaveCSS('height', '24px');
    await expect(collapse).toHaveCSS('opacity', '0');
    await expect(collapse).toHaveCSS('visibility', 'visible');
  });

  test('runs the enter transition on mount when appear and in are both set', { tag: ['@transition'] }, async ({ page }) => {
    await installTransitionRecorder(page);
    const scope = await visit(page, 'collapse', { appear: '', initiallyOpen: '' });
    await expect.poll(async () => (await events(scope, 'entered')).length).toBe(1);
    await expect.poll(() => scope.getByTestId('collapse').evaluate(element => element.getAnimations().length)).toBe(0);
    const entries = await transitionLog(page, 'collapse');

    // The forced reflow before the first measured render keeps the enter
    // transition instead of jumping straight to the final height.
    const run = transitionRun(entries, 'height');
    expect(heightKeyframes(run)).toEqual(['0px', '100px']);
    expectEnteringHeight(run, 0, 100);
    const completion = heightCompletion(entries);
    expect(['transitionend', 'transitioncancel']).toContain(completion.type);
    expect(heightOf(completion)).toBeGreaterThan(99);
    expect(heightOf(completion)).toBeLessThanOrEqual(100);

    await expect(scope.getByTestId('collapse')).toHaveCSS('visibility', 'visible');
    expect((await events(scope)).map(entry => entry.type)).toEqual(['enter', 'entering', 'entered']);
  });
});

test.describe('Grow', { tag: '@grow' }, () => {
  test('derives the auto transition duration from the real client height', { tag: ['@transition', '@geometry'] }, async ({ page }) => {
    await installTransitionRecorder(page);
    const scope = await visit(page, 'grow');
    const grow = scope.getByTestId('grow');

    // Exited before the first measured render.
    await expect(grow).toHaveCSS('opacity', '0');
    await expect(grow).toHaveCSS('visibility', 'hidden');
    expect(scaleOf(await grow.evaluate(element => getComputedStyle(element).transform))).toEqual([0.75, 0.5625]);

    // 100px of content: getAutoHeightDuration(100) = 239ms, transform = 159ms.
    // The entered state switches `transform` from `scale(1, 1)` to `none`, which
    // starts an identity transition; settle every animation before the next
    // phase so its events cannot leak into the exit slice.
    await scope.getByTestId('toggle').click();
    await expect(grow).toHaveCSS('transform', 'none');
    await expect.poll(() => grow.evaluate(element => element.getAnimations().length)).toBe(0);
    const enter = await transitionLog(page, 'grow');

    const enterOpacity = transitionRun(enter, 'opacity');
    expect(enterOpacity.transitionDuration).toBe('0.239s, 0.159s');
    expect(enterOpacity.transitionDelay).toBe('0s, 0s');
    expect(opacityKeyframes(enterOpacity)).toEqual(['0', '1']);
    expect(transformKeyframes(transitionRun(enter, 'transform'))).toEqual(['scale(0.75, 0.5625)', 'scale(1)']);
    expectElapsed(transitionEnd(enter, 'opacity'), 0.239);
    expectElapsed(transitionEnd(enter, 'transform'), 0.159);
    await expect(grow).toHaveCSS('opacity', '1');
    await expect(grow).toHaveCSS('visibility', 'visible');

    // Growing the content to 300px re-measures clientHeight: 312ms and 208ms,
    // with a 104ms exit transform delay.
    await scope.getByTestId('resize').click();
    const exitStart = enter.length;
    await scope.getByTestId('toggle').click();
    await expect(grow).toHaveCSS('visibility', 'hidden');
    await expect.poll(async () => (
      (await transitionLog(page, 'grow')).slice(exitStart).filter(entry => entry.type === 'transitionend').length
    )).toBe(2);
    const exit = (await transitionLog(page, 'grow')).slice(exitStart);

    const exitOpacity = transitionRun(exit, 'opacity');
    expect(exitOpacity.transitionDuration).toBe('0.312s, 0.208s');
    expect(exitOpacity.transitionDelay).toBe('0s, 0.104s');
    expect(opacityKeyframes(exitOpacity)).toEqual(['1', '0']);
    expect(transformKeyframes(transitionRun(exit, 'transform'))).toEqual(['none', 'scale(0.75, 0.5625)']);
    expectElapsed(transitionEnd(exit, 'opacity'), 0.312);
    expectElapsed(transitionEnd(exit, 'transform'), 0.208);

    await expect(grow).toHaveCSS('opacity', '0');
    await expect(grow).toHaveCSS('visibility', 'hidden');
  });
});
