import { Box, Flex, Grid, Stack, useTheme, useColorMode, colorStyle } from '@trendmicro/react-styled-ui';
import _get from 'lodash/get';
import React from 'react';

const splitString = (value) => value.split(':');

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
  const _mode = mode === 'blindness' ? undefined : mode;
  const baseProps = {
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
  }[_mode ?? colorMode];
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

export const FunctionalColorPalette = ({ mode, paletteInfo, ...props }) => {
  const { palette, type, color, label } = paletteInfo;
  const { colorMode } = useColorMode();
  const showBoxBorder = (color === 'rgba(255, 255, 255, 1.0)' || color === '#151515');
  const boxProps = {
    width: '80px',
    height: '80px',
    border: showBoxBorder ? 1 : 0,
    borderColor: {
      dark: 'gray:70',
      light: 'gray:30'
    }[mode ?? colorMode],
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

  const showHue = typeof label === 'string' && !label.includes('black') && !label.includes('white');
  let colorInfo;

  if (showHue) {
    colorInfo = <Box {...infoProps}>{label} {color}</Box>;
  } else if (palette === 'gradient') {
    colorInfo = label.map(label => <Box key={label.value} {...infoProps}>{label.token} {label.value}</Box>);
  } else {
    colorInfo = <Box {...infoProps}>{color}</Box>;
  }
  return (
    <Box>
      <Box background={color} {...boxProps} />
      <Box {...titleProps}>{palette}.{type}</Box>
      {colorInfo}
    </Box>
  );
};

export const FunctionalColorPalettes = ({ mode, palette, ...props }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _mode = mode ?? colorMode;
  const palettes = _get(colorStyle[_mode], palette);
  const getColor = (type) => _get(theme, `colors.${type}`, type);
  const palettesInfo = Object.keys(palettes).map(type => {
    const token = getColor(palettes[type]) === palettes[type] ? null : palettes[type];
    const color = getColor(palettes[type]);
    const label = getColor(palettes[type]) === palettes[type] ? null : palettes[type].replace(':', ' ');
    if (palette === 'gradient') {
      const regex = /([a-zA-Z]+:\w+)/g;
      const matches = palettes[type].match(regex);
      const color = palettes[type].replace(regex, match => getColor(match));
      const label = matches.map(match => {
        const token = match.replace(':', ' ');
        const value = getColor(match);
        return { token, value };
      });
      return { palette, type, token, color, label };
    }
    return { palette, type, token, color, label };
  });
  return (
    <FunctionalColorWrapper mode={_mode}>
      {
        palettesInfo.map(colorPalette => (
          <FunctionalColorPalette
            key={`${colorPalette.palette}-${colorPalette.type}-${colorPalette.color}`}
            mode={_mode}
            paletteInfo={colorPalette}
          />
        ))
      }
    </FunctionalColorWrapper>
  );
};
