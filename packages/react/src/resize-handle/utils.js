export const getIsPassiveListenerSupported = (() => {
  let isPassiveListenerSupported = null;

  // The `win` argument provides the window context (e.g. from `useEnvironment`)
  // so this helper does not reference the global `window` directly.
  return (win = window) => {
    if (typeof isPassiveListenerSupported === 'boolean') {
      return isPassiveListenerSupported;
    }

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
    } catch (_error) {
      isPassiveListenerSupported = false;
    }

    return isPassiveListenerSupported;
  };
})();
