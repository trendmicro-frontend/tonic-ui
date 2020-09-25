import React from 'react';
import { Box, Flex, Grid, Stack, useTheme, useColorMode } from '@trendmicro/react-styled-ui';
import getColorPalette from '@trendmicro/styled-ui-theme/build/color-palette';

const splitString = (value) => value.split(':');
const getColorToken = (val, obj) => Object.keys(obj).find(key => obj[key] === val);

export const ColorPalette = ({ token, color, ...props }) => {
  const [hue, shade] = splitString(token);
  const colorPaletteProps = {
    justify: 'space-between',
    fontSize: 'sm',
    width: '300px',
    height: '12x',
    py: '3x',
    px: '4x',
    lineHeight: 'lg',
    fontFamily: 'mono',
    color: (shade <= 50) ? 'black' : 'white',
    backgroundColor: color,
  };

  return (
    <Flex {...colorPaletteProps} {...props}>
      <Box>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade}</Box>
      <Box>{color}</Box>
    </Flex>
  );
};

export const ColorPalettes = ({ hue }) => {
  const theme = useTheme();
  const regex = RegExp(hue, 'g');
  const colorTokens = Object.keys(theme.colors).filter(tokens => tokens.match(regex)).reduce((obj, key) => {
    obj[key] = theme.colors[key];
    return obj;
  }, {});

  return (
    <Flex align="center">
      <Stack direction="column">
        {
          Object.keys(colorTokens).map((token) => (
            <ColorPalette key={token} token={`${token}`} color={`${colorTokens[token]}`} />
          ))
        }
      </Stack>
    </Flex>
  );
};

export const ColorWrapper = props => (
  <Grid
    gap="6x"
    templateColumns="repeat(auto-fit, 300px)"
    {...props}
  />
);

export const FunctionalColorWrapper = ({ mode, ...props }) => {
  const { colorMode } = useColorMode();
  const baseProps = mode && {
    light: {
      bg: 'white',
      border: 1,
      borderColor: 'gray:20',
    },
    dark: {
      bg: 'gray:100',
      border: 1,
      borderColor: 'gray:70',
    }
  }[mode ?? colorMode];
  return (
    <Grid
      px="14x"
      py="10x"
      rowGap="8x"
      columnGap="6x"
      templateColumns="repeat(auto-fit, 120px)"
      maxWidth="1242px"
      {...baseProps}
      {...props}
    />
  );
};

export const FunctionalColorPalette = ({ mode, palette, colorType, color, ...props }) => {
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

  if (palette === 'gradient') {
    const gradientColor = color.match(/#\w+/g);
    colorInfo = gradientColor.map((color) => {
      const [hue, shade] = splitString(getColorToken(color, theme.colors));
      return <Box key={color} {...infoProps}>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade} {color}</Box>;
    });
  } else {
    const [hue, shade] = splitString(getColorToken(color, theme.colors));
    colorInfo = (palette === 'text' && ['black', 'white'].includes(hue))
      ? <Box {...infoProps}>{color}</Box>
      : <Box {...infoProps}>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade} {color}</Box>;
  }

  return (
    <Box>
      <Box background={color} {...boxProps} />
      <Box {...titleProps}>{palette}.{colorType}</Box>
      {colorInfo}
    </Box>
  );
};

export const FunctionalColorPalettes = ({ mode, type, palette, ...props }) => {
  const paletteColor = (type && palette) ? `${type}.${palette}` : palette ?? type;
  const palettes = getColorPalette(mode).get(paletteColor);
  return (
    <FunctionalColorWrapper mode={mode}>
      {
        Object.keys(palettes).map((color) => (
          <FunctionalColorPalette
            key={color}
            mode={mode}
            palette={palette ?? type}
            colorType={color}
            color={`${palettes[color]}`}
          />
        ))
      }
    </FunctionalColorWrapper>
  );
};
