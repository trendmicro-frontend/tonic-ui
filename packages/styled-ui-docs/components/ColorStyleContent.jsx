import {
  Box,
  useColorMode,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const ColorStyleContent = (props) => {
  const [colorMode] = useColorMode();
  const baseProps = {
    dark: {
      bg: 'gray:100',
      border: 1,
      borderColor: 'gray:70',
    },
    light: {
      bg: 'white',
      border: 1,
      borderColor: 'gray:20',
    },
  }[colorMode];

  return (
    <Box
      px="10x"
      py="8x"
      {...baseProps}
      {...props}
    />
  );
};

export default ColorStyleContent;
