const focusableElementSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled="true"])',
  '*[contenteditable]',
].join(',');

const getFocusableElements = (element, keyboardOnly = false) => {
  let focusableElements = Array.from(element.querySelectorAll(focusableElementSelector));

  // filter out elements with display: none
  focusableElements = focusableElements.filter(
    focusableElement => window.getComputedStyle(focusableElement).display !== 'none',
  );

  if (keyboardOnly === true) {
    focusableElements = focusableElements.filter(
      focusableElement => focusableElement.getAttribute('tabindex') !== '-1',
    );
  }

  return focusableElements;
};

export default getFocusableElements;
