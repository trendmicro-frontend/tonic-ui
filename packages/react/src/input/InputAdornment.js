import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultSize, defaultVariant } from './constants';
import { useInputAdornmentStyle } from './styles';
import useInputGroup from './useInputGroup';

/**
 * @typedef {Object} InputAdornmentProps
 * @property {React.ReactNode} [children] - The content of the input adornment.
 */

/**
 * @type {ForwardRefComponent<'div', InputAdornmentProps>}
 */
const InputAdornment = forwardRef((inProps, ref) => {
  const {
    size: sizeProp,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputAdornment' });
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
  const styleProps = useInputAdornmentStyle({ size, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

InputAdornment.displayName = 'InputAdornment';

export default InputAdornment;
