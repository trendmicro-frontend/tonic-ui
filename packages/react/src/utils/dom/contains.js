import canUseDOM from './canUseDOM';

// https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
const DOCUMENT_POSITION_CONTAINED_BY = 16;

const fallback = (context, node) => {
  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }
  return false;
};

// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
const contains = (context, node) => {
  if (!canUseDOM) {
    return fallback(context, node);
  }

  if (context.contains) {
    return context.contains(node);
  }

  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & DOCUMENT_POSITION_CONTAINED_BY); // eslint-disable-line no-bitwise
  }

  return fallback(context, node);
};

export default contains;
