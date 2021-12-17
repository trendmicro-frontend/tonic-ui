import {
  Box,
  useColorMode,
  useColorStyle,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const SkeletonContent = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const styleProps = {
    light: {
      color: 'black:primary',
      bg: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:20',
      boxShadow: colorStyle?.shadow?.thick,
    },
    dark: {
      color: 'white:primary',
      bg: 'gray:90',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.thick,
    },
  }[colorMode];

  return (
    <Box p="4x" {...styleProps} {...props} />
  );
};

export default SkeletonContent;
