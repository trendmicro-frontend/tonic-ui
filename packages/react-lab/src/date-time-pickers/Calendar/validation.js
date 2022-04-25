import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isValid from 'date-fns/isValid';
import isNullOrUndefined from '../../utils/isNullOrUndefined';

const validateDate = (value, props) => {
  const { maxDate, minDate } = { ...props };

  if (isNullOrUndefined(value)) {
    return undefined; // not selected
  }

  const date = new Date(value);
  if (!isValid(date)) {
    return 'Invalid date';
  }

  if (maxDate && minDate && isBefore(maxDate, minDate)) {
    return '"maxDate" must not be before "minDate"';
  }

  if (maxDate && minDate && (isBefore(date, minDate) || isAfter(date, maxDate))) {
    return '"date" must not be before "minDate" or after "maxDate"';
  }

  if (maxDate && isAfter(date, maxDate)) {
    return '"date" must not be after "maxDate"';
  }

  if (minDate && isBefore(date, minDate)) {
    return '"date" must not be before "minDate"';
  }

  return undefined;
};

export {
  validateDate,
};
