// A TouchList is array-like but not an Array, so `Array.isArray` is false for
// native touch events. `touches` is empty for `touchend`, where the released
// point is exposed through `changedTouches` instead.
const getTouch = (event) => event.touches?.[0] ?? event.changedTouches?.[0];

export const getIsPassiveListenerSupported = (() => {
  // Cache the result per window so the detection runs once per environment.
  // Keying on the window object keeps the `win` argument meaningful (a value
  // cached for the main window must not leak into an iframe/shadow window).
  const cache = new WeakMap();

  // The `win` argument provides the window context (e.g. from `useEnvironment`)
  // so this helper does not reference the global `window` directly.
  return (win = window) => {
    if (cache.has(win)) {
      return cache.get(win);
    }

    let isPassiveListenerSupported = false;

    try {
      const options = {
        get passive() {
          isPassiveListenerSupported = true;
          return false;
        }
      };

      const noop = () => {};

      win.addEventListener('test', noop, options);
      win.removeEventListener('test', noop);
    } catch {
      isPassiveListenerSupported = false;
    }

    cache.set(win, isPassiveListenerSupported);
    return isPassiveListenerSupported;
  };
})();

export {
  getTouch,
};
