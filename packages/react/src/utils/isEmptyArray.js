const isEmptyArray = (value) => {
  return Array.isArray(value) && value.length === 0;
};

export default isEmptyArray;
