import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const InputLabel = forwardRef((
  {
    size = 'md',
    ...rest
  },
  ref,
) => {
  const { colorMode } = useColorMode();
  const colorProps = {
    dark: {
      color: 'white:secondary',
    },
    light: {
      color: 'black:secondary',
    },
  }[colorMode];
  const sizeProps = {
    'sm': {
      fontSize: 'sm',
      lineHeight: 'sm',
    },
    'md': {
      fontSize: 'sm',
      lineHeight: 'sm',
    },
    'lg': {
      fontSize: 'md',
      lineHeight: 'md',
    },
  }[size];

  return (
    <Box
      ref={ref}
      mb="1x"
      {...colorProps}
      {...sizeProps}
      {...rest}
    />
  );
});

InputLabel.displayName = 'InputLabel';

export default InputLabel;
