import React from 'react';
import { Box, Flex, Grid, useTheme } from '@trendmicro/react-styled-core';

export const ColorPalette = ({ color, name, ...props }) => {
  const theme = useTheme();
  let colorCode = color;
  const [shade, hue] = color.split(':');

  if (color in theme.colors && typeof theme.colors[color] === 'string') {
    colorCode = theme.colors[color];
  }

  return (
    <Flex align="center" {...props}>
      <Box width="12x" height="12x" mr="2x" bg={color} />
      <Box fontSize="sm">
        <Box fontWeight="semibold" textTransform="capitalize">
          {shade} {hue}
        </Box>
        <Box textTransform="uppercase">{colorCode}</Box>
      </Box>
    </Flex>
  );
};

export const ColorPalettes = ({ color }) => {
  const theme = useTheme();
  const regex = RegExp(color, 'g');
  const colors = Object.keys(theme.colors).filter(key => key.match(regex)).reduce((obj, key) => {
    obj[key] = theme.colors[key];
    return obj;
  }, {});
  const keys = Object.keys(colors);
  return keys.map((item) => (
    <ColorPalette key={item} color={`${item}`} name={`${item}`} />
  ));
};

export const ColorWrapper = props => (
  <Grid
    mt="2x"
    gap="2x"
    templateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
    {...props}
  />
);
