import { useReducer } from 'react';

const defaultToggleFunction = (state, nextValue) => {
  return (typeof nextValue === 'boolean') ? nextValue : !state;
};

/**
 * A custom Hook that toggles between boolean values. It also accepts a toggle function that can be used to change the value.
 *
 * @param {boolean} initialValue - The initial value of the toggle.
 * @param {function} [toggleFunction] - A reducer function that can be used to determine the next value.
 * @returns {boolean} The current value of the toggle.
 */
const useToggle = (
  initialValue = false,
  toggleFunction = defaultToggleFunction,
) => {
  return useReducer(toggleFunction, initialValue);
};

export default useToggle;
