import { useContext } from 'react';
import { InputGroupContext } from './context';

/**
 * @typedef {Object} InputGroupContextValue
 * @property {'sm' | 'md' | 'lg'} size - The size of the input group.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} variant - The variant of the input group.
 */

/**
 * A hook to access the input group context.
 * @returns {InputGroupContextValue | undefined} The input group context, or `undefined` if not within an `InputGroup`.
 */
const useInputGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(InputGroupContext);
  return context;
};

export default useInputGroup;
