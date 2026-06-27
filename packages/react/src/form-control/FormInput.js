import { Input } from '../input';
import withFormControl from './withFormControl';

/**
 * @typedef {Object} FormInputProps
 * @property {boolean} [disabled] - The input is disabled and the user cannot interact with it.
 * @property {boolean} [error] - The input displays a red border to indicate an error.
 * @property {boolean} [readOnly] - The value of the input cannot be edited.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The visual size of the `input` element.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} [variant='outline'] - The variant of the input style to use.
 */

/**
 * @type {ForwardRefComponent<'input', FormInputProps>}
 */
const FormInput = withFormControl(Input);

export default FormInput;
