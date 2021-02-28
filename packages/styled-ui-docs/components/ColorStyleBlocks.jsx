import {
  Box,
  Grid,
  Space,
  Tag,
  Text,
  useTheme,
  useColorMode,
  useColorStyle } from '@trendmicro/react-styled-ui';
import { ensurePlainObject, ensureString } from 'ensure-type';
import _get from 'lodash/get';
import _has from 'lodash/has';
import React from 'react';
import { yiq } from 'yiq';

const isValidHex = (hex) => {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
};

const ColorStyleBlock = ({
  colorType,
  colorKey,
  colorValue,
  colorToken,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const primaryTextColor = colorStyle.text.primary;
  const secondaryTextColor = colorStyle.text.secondary;

  const blockProps = {};

  if (isValidHex(colorValue)) {
    blockProps.color = yiq(colorValue, {
      colors: {
        dark: 'black:secondary',
        light: 'white:secondary',
      },
      threshold: 128,
    });
  } else if (ensureString(colorToken).startsWith('white:')) {
    blockProps.color = 'black:secondary';
  } else if (ensureString(colorToken).startsWith('black:')) {
    blockProps.color = 'white:secondary';
  } else {
    blockProps.color = secondaryTextColor;
  }

  if (colorType === 'shadow') {
    blockProps.boxShadow = colorValue;
  } else {
    blockProps.backgroundColor = colorValue;
  }

  return (
    <Box>
      <Box
        mb="2x"
      >
        <Text
          color={primaryTextColor}
          fontSize="md"
          lineHeight="md"
        >
          {colorKey}
        </Text>
      </Box>
      <Box
        width="auto"
        height="120px"
        mb="3x"
        {...blockProps}
      >
        <Text
          fontFamily="mono"
          fontWeight="semibold"
          fontSize="sm"
          lineHeight="sm"
          m="2x"
        >
          {colorValue}
        </Text>
      </Box>
      {colorToken && (
        <Box>
          <Tag
            variant="outline"
            color={secondaryTextColor}
            fontFamily="mono"
            fontSize="sm"
            lineHeight="sm"
            mb="2x"
          >
            {colorToken}
          </Tag>
          <Space width="3x" />
        </Box>
      )}
    </Box>
  );
};

const ColorStyleBlocks = ({
  colorType,
  ...props
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorStyleBlocks = Object.keys(ensurePlainObject(_get(colorStyle, colorType)))
    .map(colorKey => {
      const originalColorValue = _get(colorStyle, `${colorType}.${colorKey}`);
      const colorToken = _has(theme, ['colors', originalColorValue]) ? originalColorValue : null;
      const colorValue = _get(theme, ['colors', originalColorValue]) ?? originalColorValue;

      /**
       * Example:
       *
       * {
       *   background: {
       *     secondary: 'gray:90',
       *   }
       * }
       *
       * colorType  = 'background'
       * colorKey   = 'secondary'
       * colorToken = 'gray:90'
       * colorValue = '#212121'
       */
      return {
        colorType,
        colorKey,
        colorToken,
        colorValue,
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
      {colorStyleBlocks.map(({ colorType, colorKey, colorValue, colorToken }) => {
        return (
          <ColorStyleBlock
            key={colorKey}
            colorType={colorType}
            colorKey={colorKey}
            colorValue={colorValue}
            colorToken={colorToken}
          />
        );
      })}
    </Grid>
  );
};

export default ColorStyleBlocks;
