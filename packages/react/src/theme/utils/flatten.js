import { isObject } from '@tonic-ui/utils';

const flatten = (target) => {
  if (!isObject(target) && !Array.isArray(target)) {
    return target;
  }

  return Object.entries(target).reduce((result, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      Object.entries(flatten(value)).forEach(([childKey, childValue]) => {
        result[`${key}.${childKey}`] = childValue;
      });
    } else {
      result[key] = value;
    }

    return result;
  }, {});
};

export default flatten;
