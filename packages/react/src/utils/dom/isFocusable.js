import focusableSelector from './focusableSelector';

const isVisible = (element) => {
  return (
    element?.offsetWidth > 0 ||
    element?.offsetHeight > 0 ||
    element?.getClientRects()?.length > 0
  );
};

// Check whether the element is focusable
const isFocusable = (element) => {
  return isVisible(element) && element?.matches(focusableSelector);
};

export default isFocusable;
