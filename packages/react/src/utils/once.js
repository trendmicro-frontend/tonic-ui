const once = (fn) => {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result;
  };
};

export default once;
