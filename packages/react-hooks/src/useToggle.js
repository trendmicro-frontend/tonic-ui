import { useReducer } from 'react';

const defaultToggleReducer = (state, nextValue) => {
  return (typeof nextValue === 'boolean') ? nextValue : !state;
};

/**
 * A custom Hook that toggles between boolean values. It also accepts a toggle function that can be used to change the value.
 *
 * @param {boolean} initialValue - The initial value of the toggle.
 * @param {function} [toggleReducer] - An optional reducer function that can be used to determine the next value.
 * @returns {[boolean, function]} Returns an array with the current value and a function to toggle the value.
 */
const useToggle = (
  initialValue = false,
  toggleReducer = defaultToggleReducer,
) => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
