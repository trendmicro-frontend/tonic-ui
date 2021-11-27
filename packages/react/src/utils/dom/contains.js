import canUseDOM from './canUseDOM';

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
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  return fallback(context, node);
};

export default contains;
