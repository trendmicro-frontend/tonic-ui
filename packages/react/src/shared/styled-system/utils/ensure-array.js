const ensureArray = (value, defaultValue = []) => {
  if (value === undefined || value === null) {
    return [].concat(defaultValue);
  }

  return Array.isArray(value) ? value : [].concat(value);
};

export default ensureArray;
