import { ensureFiniteNumber } from 'ensure-type';

const pixelize = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  value = ensureFiniteNumber(value);
  return `${value}px`;
};

export default pixelize;