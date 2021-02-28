import { Box, Flex, Grid, Stack, useTheme, useColorMode, useColorStyle } from '@trendmicro/react-styled-ui';
import { ensurePlainObject } from 'ensure-type';
import _get from 'lodash/get';
import React from 'react';

const ColorStyleBlock = ({
  colorType,
  colorKey,
  colorValue,
  label,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const showBoxBorder = (colorValue === 'rgba(255, 255, 255, 1.0)' || colorValue === '#151515');
  const boxProps = {
    width: '80px',
    height: '80px',
    border: showBoxBorder ? 1 : 0,
    borderColor: {
      dark: 'gray:70',
      light: 'gray:30'
    }[colorMode],
  };
  const titleProps = {
    fontSize: 'sm',
    mt: '2x',
    color: {
      dark: 'white:primary',
      light: 'black:primary'
    }[colorMode]
  };
  const infoProps = {
    fontSize: 'xs',
    lineHeight: 'sm',
    color: {
      dark: 'white:secondary',
      light: 'black:secondary'
    }[colorMode],
  };

  const showHue = typeof label === 'string' && !label.includes('black') && !label.includes('white');
  let colorInfo;

  if (showHue) {
    colorInfo = <Box {...infoProps}>{label} {colorValue}</Box>;
  } else {
    colorInfo = <Box {...infoProps}>{colorValue}</Box>;
  }

  if (colorType === 'shadow') {
    boxProps.boxShadow = colorValue;
    boxProps.width = '240px';
    boxProps.height = '160px';
  } else {
    boxProps.backgroundColor = colorValue;
  }

  return (
    <Box>
      <Box {...boxProps} />
      <Box {...titleProps}>{colorKey}</Box>
      {colorInfo}
    </Box>
  );
};

const ColorStyleBlocks = ({
  type: colorType,
  ...props
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorStyleBlocks = Object.keys(ensurePlainObject(_get(colorStyle, colorType)))
    .map(colorKey => {
      const originalColorValue = _get(colorStyle, [colorType, colorKey]);
      const resolvedColorValue = _get(theme, ['colors', originalColorValue]) ?? originalColorValue;
      return {
        colorType,
        colorKey,
        colorValue: resolvedColorValue,
        originalColorValue,
      };
    });
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
  }[colorMode];

  return (
    <Grid
      px="14x"
      py="10x"
      rowGap="8x"
      columnGap="6x"
      templateColumns="repeat(auto-fit, minmax(160px, 1fr))"
      {...baseProps}
      {...props}
    >
      {colorStyleBlocks.map(({ colorType, colorKey, colorValue }) => {
        return (
          <ColorStyleBlock
            key={colorKey}
            colorType={colorType}
            colorKey={colorKey}
            colorValue={colorValue}
          />
        );
      })}
    </Grid>
  );
};

export default ColorStyleBlocks;
