import {
  Box,
  useTheme,
  useColorMode,
  useColorStyle,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const ColorStyleHeader = (props) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const primaryTextColor = colorStyle.text.primary;

  return (
    <Box
      mb="5x"
      color={primaryTextColor}
      {...props}
    />
  );
};

export default ColorStyleHeader;
