import { getComputedStyle } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';

const getInnerWidth = (el) => {
  const clientWidth = parseFloat(el?.clientWidth) || 0;
  let innerWidth = clientWidth;

  try {
    const computedStyle = getComputedStyle(el);
    const paddingLeft = parseFloat(computedStyle?.paddingLeft);
    const paddingRight = parseFloat(computedStyle?.paddingRight);
    innerWidth = ensureFiniteNumber(clientWidth - paddingLeft - paddingRight);
  } catch (e) {
    // do nothing
  }

  return innerWidth;
};

export default getInnerWidth;
