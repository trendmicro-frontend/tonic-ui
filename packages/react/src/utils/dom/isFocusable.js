import getFocusableElementSelectors from './getFocusableElementSelectors';

const focusableElementSelector = getFocusableElementSelectors().join(',');

const isVisible = (element) => {
  return (
    element?.offsetWidth > 0 ||
    element?.offsetHeight > 0 ||
    element?.getClientRects()?.length > 0
  );
};

// Check whether the element is focusable
const isFocusable = (element) => {
  return isVisible(element) && element?.matches(focusableElementSelector);
};

export default isFocusable;
