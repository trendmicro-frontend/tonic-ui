const focusableElList = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]',
];

const focusableElSelector = focusableElList.join();

const getFocusables = (element, keyboardOnly = false) => {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector));

  // filter out elements with display: none
  focusableEls = focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== 'none',
  );

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(
      focusableEl => focusableEl.getAttribute('tabindex') !== '-1',
    );
  }

  return focusableEls;
};

export default getFocusables;
