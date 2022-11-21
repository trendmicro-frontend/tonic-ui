const attachProxyOnce = (() => {
  let called = false;
  return (target, fn) => {
    if (called) {
      return target;
    }

    const handler = {
      get: (...args) => {
        if (!called) {
          fn?.();
          called = true;
        }
        return Reflect.get(...args);
      }
    };
    return new Proxy(target, handler);
  };
})();

export {
  attachProxyOnce,
};
