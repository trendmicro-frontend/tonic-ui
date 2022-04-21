import isNullOrUndefined from '../../utils/isNullOrUndefined';

const validateDate = (value, props) => {
  if (isNullOrUndefined(value)) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return 'Invalid Date';
  }

  return undefined;
};

export {
  validateDate,
};
