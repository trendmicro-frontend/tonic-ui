import React, { forwardRef } from 'react';
import { composeSx } from '@tonic-ui/utils/internal';
import { useDefaultProps } from '../default-props';
import InputBase from './InputBase';
import { useInputStyle } from './styles';
import useInputGroup from './useInputGroup';
import { defaultSize, defaultVariant } from './constants';

/**
 * @typedef {Object} InputProps
 * @property {boolean} [disabled] - The input is disabled and the user cannot interact with it.
 * @property {boolean} [error] - The input displays a red border to indicate an error.
 * @property {boolean} [readOnly] - The value of the input cannot be edited.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The visual size of the `input` element.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} [variant='outline'] - The variant of the input style to use.
 */

/**
 * @type {ForwardRefComponent<'input', InputProps>}
 */
const Input = forwardRef((inProps, ref) => {
  const {
    __sx: __sxProp,
    size: sizeProp,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Input' });
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
  const styleProps = useInputStyle({ size, variant, inputGroup: !!inputGroupContext });

  return (
    <InputBase
      ref={ref}
      as="input"
      {...rest}
      __sx={composeSx(styleProps, __sxProp)}
    />
  );
});

Input.displayName = 'Input';

export default Input;
