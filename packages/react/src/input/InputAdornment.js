import React, { forwardRef } from 'react';
import { Box } from '../box';
import { defaultSize, defaultVariant } from './constants';
import { useInputAdornmentStyle } from './styles';
import useInputGroup from './useInputGroup';

const InputAdornment = forwardRef((
  {
    size: sizeProp,
    variant: variantProp,
    ...rest
  },
  ref,
) => {
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
