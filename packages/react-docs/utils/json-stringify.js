const x = (...args) => {
  let x;
  try {
    x = JSON.stringify(...args);
  } catch (_error) { // eslint-disable-line no-unused-vars
    // JSON.stringify() throws an error when it detects a cyclical object. In other words, if an object obj has a property whose value is obj, JSON.stringify() will throw an erro
  }
  return x;
};

export default x;
