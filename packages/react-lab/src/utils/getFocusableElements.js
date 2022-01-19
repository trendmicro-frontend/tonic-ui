import getFocusableElementSelectors from './dom/getFocusableElementSelectors';
import getComputedStyle from './dom/getComputedStyle';

const focusableElementSelector = getFocusableElementSelectors().join(',');

const getFocusableElements = (element, keyboardOnly = false) => {
  let focusableElements = Array.from(element.querySelectorAll(focusableElementSelector));

  // Filter out elements with `display: none`
  focusableElements = focusableElements.filter(focusableElement => {
    const computedStyle = getComputedStyle(focusableElement);
    return computedStyle?.display !== 'none';
  });

  if (keyboardOnly === true) {
    focusableElements = focusableElements.filter(focusableElement => {
      return focusableElement.getAttribute('tabindex') !== '-1';
    });
  }

  return focusableElements;
};

export default getFocusableElements;
