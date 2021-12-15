const runIfFn = (valueOrFn, ...args) => {
  if (typeof valueOrFn === 'function') {
    return valueOrFn(...args);
  }
  return valueOrFn;
};

export default runIfFn;
