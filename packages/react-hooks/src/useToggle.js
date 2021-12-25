import { useReducer } from 'react';

const defaultToggleFunction = (state, nextValue) => {
  return (typeof nextValue === 'boolean') ? nextValue : !state;
};

/**
 * `useToggle` is a custom Hook that toggles between boolean values. It also accepts a toggle function that can be used to change the value.
 * @param {boolean} initialValue Initial value of the toggle.
 * @param {function} toggleFunction A toggle function.
 * @return {[boolean, function]} The current value and a function to toggle the value.
 */
const useToggle = (
  initialValue = false,
  toggleFunction = defaultToggleFunction,
) => {
  return useReducer(toggleFunction, initialValue);
};

export default useToggle;
