import { useContext } from 'react';
import { FormControlContext } from './context';

/**
 * @typedef {Object} FormControlContextValue
 * @property {boolean} disabled - Whether the form control is disabled.
 * @property {boolean} error - Whether the form control is in error state.
 * @property {boolean} readOnly - Whether the form control is read-only.
 * @property {string} formCharacterCountId - The id for the character count element.
 * @property {string} formErrorMessageId - The id for the error message element.
 * @property {string} formHelperTextId - The id for the helper text element.
 * @property {string} fieldId - The id for the field element.
 * @property {'vertical' | 'horizontal'} orientation - The orientation of the form control.
 */

/**
 * A hook to access the form control context.
 * @returns {FormControlContextValue | undefined} The form control context, or `undefined` if not within a `FormControl`.
 */
const useFormControl = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(FormControlContext);
  return context;
};

export default useFormControl;
