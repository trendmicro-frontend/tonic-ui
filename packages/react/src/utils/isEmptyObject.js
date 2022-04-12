import isNullOrUndefined from './isNullOrUndefined';

const isEmptyObject = (value) => {
  return !isNullOrUndefined(value) && Object.keys(value).length === 0 && value.constructor === Object;
};

export default isEmptyObject;
