import React from 'react';
import { Box, Flex, Grid, Stack, LightMode, DarkMode, useTheme } from '@trendmicro/react-styled-ui';

export const ColorPalette = ({ color, name, ...props }) => {
  const theme = useTheme();
  let colorCode = color;
  const [shade, hue] = color.split(':');
  const flexStyleProps = {
    justify: 'space-between',
    fontSize: 'sm',
    width: '64x',
    height: '12x',
    py: '3x',
    px: '4x',
    lineHeight: 'lg',
    color: (hue <= 50) ? 'black' : 'white',
    bg: color
  };

  if (color in theme.colors && typeof theme.colors[color] === 'string') {
    colorCode = theme.colors[color];
  }

  return (
    <Flex {...flexStyleProps} {...props}>
      <Box>{`${shade.charAt(0).toUpperCase()}${shade.slice(1)}`} {hue}</Box>
      <Box>{colorCode}</Box>
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
  return (
    <Flex align="center">
      <Stack direction="column">
        {
          keys.map((item) => (
            <ColorPalette key={item} color={`${item}`} name={`${item}`} />
          ))
        }
      </Stack>
    </Flex>
  );
};

export const ColorWrapper = props => (
  <Grid
    gap="4x"
    {...props}
  />
);

export const FunctionalColorPalettes = props => {
  return (
    <>
      <LightMode bg="white" color="black:primary" px="4x" py="2x">
      </LightMode>
      <DarkMode bg="gray:90" color="white:primary" px="4x" py="2x">
      </DarkMode>
    </>
  );
};
