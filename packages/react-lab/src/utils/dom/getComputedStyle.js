const getComputedStyle = (node) => {
  if (!node) {
    throw new TypeError('No element passed to `getComputedStyle()`');
  }

  const doc = node.ownerDocument;

  if ('defaultView' in doc) {
    if (doc.defaultView.opener) {
      return node.ownerDocument.defaultView.getComputedStyle(node, null);
    }

    return window.getComputedStyle(node, null);
  }

  return null;
};

export default getComputedStyle;
