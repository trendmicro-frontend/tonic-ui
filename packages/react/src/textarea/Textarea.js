import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { InputBase } from '../input';
import { useTextareaStyle } from './styles';

const defaultVariant = 'outline';

/**
 * @typedef {Object} TextareaProps
 * @property {number} [rows] - Specifies the number of visible lines in a textarea.
 * @property {number} [cols] - Specifies the visible width of a textarea.
 * @property {number} [maxLength] - Specifies the maximum number of characters allowed in the textarea.
 * @property {number} [minLength] - Specifies the minimum number of characters required for the textarea to be considered valid.
 * @property {'none' | 'both' | 'horizontal' | 'vertical'} [resize] - The resize behavior of the textarea.
 * @property {'outline' | 'unstyled'} [variant='outline'] - The variant of the textarea style to use.
 * @property {boolean} [disabled] - The textarea is disabled and the user cannot interact with it.
 * @property {boolean} [error] - The textarea displays a red border to indicate an error.
 * @property {boolean} [readOnly] - The value of the textarea cannot be edited.
 */

/**
 * @type {ForwardRefComponent<'textarea', TextareaProps>}
 */
const Textarea = forwardRef((inProps, ref) => {
  const {
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Textarea' });
  const styleProps = useTextareaStyle({ variant });

  return (
    <InputBase
      ref={ref}
      as="textarea"
      {...styleProps}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
