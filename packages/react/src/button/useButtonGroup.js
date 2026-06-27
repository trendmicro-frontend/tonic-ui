import { useContext } from 'react';
import { ButtonGroupContext } from './context';

/**
 * @typedef {Object} ButtonGroupContextValue
 * @property {boolean} [disabled] - Whether all buttons are disabled.
 * @property {'horizontal' | 'vertical'} orientation - The orientation of the button group.
 * @property {'sm' | 'md' | 'lg'} size - The size of the button group.
 * @property {'emphasis' | 'primary' | 'default' | 'secondary' | 'ghost'} variant - The variant of the button group.
 */

/**
 * A hook to access the button group context.
 * @returns {ButtonGroupContextValue | undefined} The button group context, or `undefined` if not within a `ButtonGroup`.
 */
const useButtonGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ButtonGroupContext);
  return context;
};

export default useButtonGroup;
