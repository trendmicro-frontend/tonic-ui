/**
 * Assign a value to a ref function or object.
 *
 * @param ref the ref to assign to
 * @param value the value
 */
const assignRef = (ref, value) => {
  if (ref === null || ref === undefined) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to internal components.
 *
 * @param refs refs to assign to value to
 */
const mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
};

export {
  assignRef,
  mergeRefs,
};
