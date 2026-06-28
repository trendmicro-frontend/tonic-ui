import { useContext } from 'react';
import { CheckboxGroupContext } from './context';

/**
 * @typedef {Object} CheckboxGroupContextValue
 * @property {boolean} [disabled] - Whether all checkboxes are disabled.
 * @property {string} name - The name attribute for the checkbox group.
 * @property {(event: { checked: boolean; value: string }) => void} onChange - A callback fired when any descendant `Checkbox` is checked or unchecked.
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the checkboxes.
 * @property {string[]} value - The current selected values.
 * @property {string} [variantColor] - The color of the checkbox when it's checked.
 */

/**
 * A hook to access the checkbox group context.
 * @returns {CheckboxGroupContextValue | undefined} The checkbox group context, or `undefined` if not within a `CheckboxGroup`.
 */
const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  return context;
};

export default useCheckboxGroup;
