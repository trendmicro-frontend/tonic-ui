const getIsPassiveListenerSupported = (() => {
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
    } catch (error) {
      isPassiveListenerSupported = false;
    }

    return isPassiveListenerSupported;
  };
});

export default getIsPassiveListenerSupported;
