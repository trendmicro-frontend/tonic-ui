import { isNullOrUndefined } from '@tonic-ui/utils';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isValid from 'date-fns/isValid';

const validateDate = (value, props) => {
  const { maxDate, minDate, shouldDisableDate } = { ...props };

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
    return 'Invalid date range';
  }

  if (maxDate && isAfter(date, maxDate)) {
    return 'Invalid date range';
  }

  if (minDate && isBefore(date, minDate)) {
    return 'Invalid date range';
  }

  if (shouldDisableDate?.(date) === true) {
    return 'Disabled date';
  }

  return undefined;
};

export {
  validateDate,
};
