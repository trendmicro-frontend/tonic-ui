export const canUseDOM = () => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
};

export const contains = (function() {
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
  return (context, node) => {
    if (!canUseDOM()) {
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
}());

export const getActiveElement = (node) => {
  const doc = getOwnerDocument(node);
  return doc?.activeElement;
};

export const getComputedStyle = (node) => {
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

export const getEventWindow = (event) => {
  return event?.view ?? window;
};

export const getLeftmostOffset = (element) => {
  if (!isHTMLElement(element)) {
    return 0;
  }
  return getLeftmostOffset(element.offsetParent) + element.offsetLeft;
};

export const getOwnerDocument = (node) => {
  return isElement(node)
    ? (node.ownerDocument ?? document)
    : document;
};

export const getOwnerWindow = (node) => {
  return isElement(node)
    ? (getOwnerDocument(node)?.defaultView ?? window)
    : window;
};

export const getRelatedTarget = (event) => {
  const target = (event.target ?? event.currentTarget);
  const activeElement = getActiveElement(target);
  return (event.relatedTarget ?? activeElement);
};

export const getTopmostOffset = (element) => {
  if (!isHTMLElement(element)) {
    return 0;
  }
  return getTopmostOffset(element.offsetParent) + element.offsetTop;
};

export const isElement = (el) => {
  return (
    el !== null &&
    el !== undefined &&
    typeof el === 'object' &&
    'nodeType' in el &&
    el.nodeType === Node.ELEMENT_NODE
  );
};

export const isHTMLElement = (el) => {
  if (!isElement(el)) {
    return false;
  }

  const win = el.ownerDocument.defaultView ?? window;
  return el instanceof win.HTMLElement;
};

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */
export const normalizeKeyboardEventKey = (event) => {
  const { key, keyCode } = event;
  const isArrowKey = (keyCode >= 37) && (keyCode <= 40) && key.indexOf('Arrow') !== 0;
  const eventKey = isArrowKey ? `Arrow${key}` : key;
  return eventKey;
};

export const reflow = (node) => node && node?.scrollTop;
