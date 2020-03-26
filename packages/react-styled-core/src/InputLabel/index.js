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
    },
    'md': {
      fontSize: 'sm',
    },
    'lg': {
      fontSize: 'md',
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
