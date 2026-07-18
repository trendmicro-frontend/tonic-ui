import { useContext } from 'react';
import { RadioGroupContext } from './context';

/**
 * @typedef {Object} RadioGroupContextValue
 * @property {boolean} [disabled] - Whether all radios are disabled.
 * @property {string} name - The name attribute for the radio group.
 * @property {(event: { value: string }) => void} onChange - A callback fired when the selected radio changes.
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the radios.
 * @property {string} [value] - The current selected value.
 * @property {string} [variantColor] - The color of the radio when it's checked.
 */

/**
 * A hook to access the radio group context.
 * @returns {RadioGroupContextValue | undefined} The radio group context, or `undefined` if not within a `RadioGroup`.
 */
const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  return context;
};

export default useRadioGroup;
