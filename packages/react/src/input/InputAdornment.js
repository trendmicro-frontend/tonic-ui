import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultSize, defaultVariant } from './constants';
import { useInputAdornmentStyle } from './styles';
import useInputGroup from './useInputGroup';

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
