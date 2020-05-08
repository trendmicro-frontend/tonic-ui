const createUniqueId = (prefix = '', suffix = '') => {
  let id = 0;
  return () => {
    return `${prefix}${id++}${suffix}`;
  };
};

const uniqueId = createUniqueId();

export {
  createUniqueId,
};
export default uniqueId;
