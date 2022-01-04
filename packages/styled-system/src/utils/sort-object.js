// sort object-value responsive styles
const sortObject = obj => {
  const next = {};

  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }))
    .forEach(key => {
      next[key] = obj[key];
    });

  return next;
};

export default sortObject;
