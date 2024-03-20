import {
  Box,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const CodeBlock = (props) => {
  const [colorStyle] = useColorStyle();

  return (
    <Box
      backgroundColor={colorStyle.background.secondary}
      border={1}
      borderColor={colorStyle.divider}
      fontFamily="mono"
      py="3x"
      px="3x"
      whiteSpace="pre"
      {...props}
    />
  );
};

export default CodeBlock;
