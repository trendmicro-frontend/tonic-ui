import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputAdornmentStyle } from './styles';
import useInputGroup from './useInputGroup';

const defaultSize = 'md';

const InputAdornment = forwardRef((
  {
    size: sizeProp,
    ...rest
  },
  ref,
) => {
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const styleProps = useInputAdornmentStyle({ size });

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
