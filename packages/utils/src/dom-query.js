import { getComputedStyle } from './dom';

const focusableElementSelectors = [
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
  '*[contenteditable]:not([contenteditable="false"])',
  '*[tabindex]:not([aria-disabled="true"])',
];

const focusableElementSelector = focusableElementSelectors.join(',');

export const getAllFocusable = (element, keyboardOnly = false) => {
  if (!element || !(element instanceof HTMLElement)) {
    return [];
  }

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
