// based on https://github.com/developit/dlv
const get = (obj, key, defaultValue, undef) => {
  if (key && key.split) {
    key = key.split('.');
  } else {
    key = Array.isArray(key) ? key : [key];
  }

  for (let i = 0; i < key.length; ++i) {
    obj = obj ? obj[key[i]] : undef;
  }

  return obj === undef ? defaultValue : obj;
};

export default get;
