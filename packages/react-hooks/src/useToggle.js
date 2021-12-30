import { useReducer } from 'react';

const defaultToggleFunction = (state, nextValue) => {
  return (typeof nextValue === 'boolean') ? nextValue : !state;
};

const useToggle = (
  initialValue = false,
  toggleFunction = defaultToggleFunction,
) => {
  return useReducer(toggleFunction, initialValue);
};

export default useToggle;
