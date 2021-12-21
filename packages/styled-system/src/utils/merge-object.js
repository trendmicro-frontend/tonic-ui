const mergeObject = (a, b) => {
  const result = Object.assign({}, a, b);

  for (const key in a) {
    if (!Object.prototype.hasOwnProperty.call(a, key)) {
      continue;
    }

    if (!a[key] || typeof b[key] !== 'object') {
      continue;
    }

    Object.assign(result, {
      [key]: Object.assign(a[key], b[key]),
    });
  }

  return result;
};

export default mergeObject;
