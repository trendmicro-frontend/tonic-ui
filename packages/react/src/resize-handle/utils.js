export const getIsPassiveListenerSupported = (() => {
  let isPassiveListenerSupported = null;

  return () => {
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

      // TODO: Use environment provider to obtain the global object and avoid referencing `window` directly
      window.addEventListener('test', noop, options);
      window.removeEventListener('test', noop);
    } catch (_error) {
      isPassiveListenerSupported = false;
    }

    return isPassiveListenerSupported;
  };
})();
