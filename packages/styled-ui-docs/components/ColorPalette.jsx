import React from 'react';
import { Box, Flex, Grid, Stack, useTheme, useColorMode } from '@trendmicro/react-styled-ui';
import { getColorPalette } from '@trendmicro/styled-ui-theme';

const splitString = (value) => value.split(':');
const getToken = (val, obj) => Object.keys(obj).find(key => obj[key] === val);

export const ColorPalette = ({ color, name, ...props }) => {
  const theme = useTheme();
  let colorCode = color;
  const [shade, hue] = splitString(color);
  const flexStyleProps = {
    justify: 'space-between',
    fontSize: 'sm',
    width: '300px',
    height: '12x',
    py: '3x',
    px: '4x',
    lineHeight: 'lg',
    fontFamily: 'mono',
    color: (hue <= 50) ? 'black' : 'white',
    bg: color,
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
    gap="6x"
    templateColumns="repeat( auto-fit, minmax(300px, 300px) )"
    {...props}
  />
);

export const FunctionalColorPalette = ({ color, value, mode, type, ...props }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const boxProps = {
    width: '80px',
    height: '80px',
  };
  const titleProps = {
    fontSize: 'sm',
    mt: '2x',
    color: {
      dark: 'white:primary',
      light: 'black:primary'
    }[mode ?? colorMode]
  };

  const infoProps = {
    fontSize: 'xs',
    lineHeight: 'sm',
    color: {
      dark: 'white:secondary',
      light: 'black:secondary'
    }[mode ?? colorMode],
  };

  let colorInfo;

  if (type === 'gradient') {
    const gradientColor = color.match(/#\w+/g);
    colorInfo = gradientColor.map((color) => {
      const [shade, hue] = splitString(getToken(color, theme.colors));
      return <Box key={color} {...infoProps}>{`${shade.charAt(0).toUpperCase()}${shade.slice(1)}`} {hue} {color}</Box>;
    });
  } else {
    const [shade, hue] = splitString(getToken(color, theme.colors));
    colorInfo = (type === 'text' && ['black', 'white'].includes(shade)) ?
      <Box {...infoProps}>{color}</Box>
      : <Box {...infoProps}>{`${shade.charAt(0).toUpperCase()}${shade.slice(1)}`} {hue} {color}</Box>;
  }

  return (
    <Box>
      <Box background={color} {...boxProps} />
      <Box {...titleProps}>{type}.{value}</Box>
      {colorInfo}
    </Box>
  );
};

export const FunctionalColorPalettes = props => {
  const { mode, type } = props;
  const palette = getColorPalette(mode);
  const functionColor = palette.get(type);
  return (
    <>
      {
        Object.keys(functionColor).map((value) => (
          <FunctionalColorPalette key={value} color={`${functionColor[value]}`} mode={mode} type={type} value={value} />
        ))
      }
    </>
  );
};

export const FunctionalColorWrapper = props => (
  <Grid
    px="14x"
    py="10x"
    rowGap="8x"
    columnGap="6x"
    templateColumns="repeat( auto-fit, minmax(120px, 120px) )"
    maxWidth="1242px"
    border={1}
    {...props}
  />
);
