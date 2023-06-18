import {
  Box,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const ColorStyleHeader = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const primaryTextColor = colorStyle?.color?.primary;

  return (
    <Box
      mb="5x"
      color={primaryTextColor}
      {...props}
    />
  );
};

export default ColorStyleHeader;
