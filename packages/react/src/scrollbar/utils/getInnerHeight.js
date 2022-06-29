import { getComputedStyle } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';

const getInnerHeight = (el) => {
  const clientHeight = parseFloat(el?.clientHeight) || 0;
  let innerHeight = clientHeight;

  try {
    const computedStyle = getComputedStyle(el);
    const paddingTop = parseFloat(computedStyle?.paddingTop);
    const paddingBottom = parseFloat(computedStyle?.paddingBottom);
    innerHeight = ensureFiniteNumber(clientHeight - paddingTop - paddingBottom);
  } catch (e) {
    // do nothing
  }

  return innerHeight;
};

export default getInnerHeight;
