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

      window.addEventListener('test', noop, options);
      window.removeEventListener('test', noop);
    } catch (_error) { // eslint-disable-line no-unused-vars
      isPassiveListenerSupported = false;
    }

    return isPassiveListenerSupported;
  };
});
