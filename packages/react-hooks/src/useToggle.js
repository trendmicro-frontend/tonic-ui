import { useReducer } from 'react';

const defaultToggleFunction = (state, nextValue) => {
  return (typeof nextValue === 'boolean') ? nextValue : !state;
};

/**
 * @param {boolean} initialValue Initial value of the toggle.
 * @param {function} toggleFunction A toggle function. This allows for non-boolean values to be used.
 */
const useToggle = (
  initialValue = false,
  toggleFunction = defaultToggleFunction,
) => {
  return useReducer(toggleFunction, initialValue);
};

export default useToggle;
