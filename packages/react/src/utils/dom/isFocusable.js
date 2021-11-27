const selector = [
  'a[href]',
  'area[href]',
  'audio[controls]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([type="hidden"]):not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'video[controls]',
  '*[contenteditable]:not([contenteditable="false"]',
  '*[tabindex]:not([aria-disabled="true"])',
].join(',');

const isVisible = (element) => {
  return (
    element?.offsetWidth > 0 ||
    element?.offsetHeight > 0 ||
    element?.getClientRects()?.length > 0
  );
};

// Check whether the element is focusable
const isFocusable = (element) => {
  return isVisible(element) && element?.matches(selector);
};

export default isFocusable;
