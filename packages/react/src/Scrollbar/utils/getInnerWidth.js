import { ensureFiniteNumber } from 'ensure-type';

const getInnerWidth = (el) => {
  const clientWidth = parseFloat(el?.clientWidth) || 0;
  let innerWidth = clientWidth;

  try {
    const view = (el?.ownerDocument?.defaultView) ?? window;
    const computedStyle = view?.getComputedStyle(el);
    const paddingLeft = parseFloat(computedStyle?.paddingLeft);
    const paddingRight = parseFloat(computedStyle?.paddingRight);
    innerWidth = ensureFiniteNumber(clientWidth - paddingLeft - paddingRight);
  } catch (e) {
    // do nothing
  }

  return innerWidth;
};

export default getInnerWidth;
