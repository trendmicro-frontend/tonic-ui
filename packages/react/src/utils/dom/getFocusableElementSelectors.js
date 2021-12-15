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
  '*[contenteditable]:not([contenteditable="false"]',
  '*[tabindex]:not([aria-disabled="true"])',
];

const getFocusableElementSelectors = () => focusableElementSelectors;

export default getFocusableElementSelectors;
