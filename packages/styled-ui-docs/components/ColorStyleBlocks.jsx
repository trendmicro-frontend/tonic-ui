import {
  Box,
  Flex,
  Grid,
  Icon,
  Space,
  Stack,
  Tag,
  Text,
  useTheme,
  useColorMode,
  useColorStyle,
} from '@trendmicro/react-styled-ui';
import { ensureString } from 'ensure-type';
import _get from 'lodash/get';
import _has from 'lodash/has';
import React from 'react';
import { yiq } from 'yiq';

const isValidHex = (hex) => {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
};

const capitalizeFirstLetter = string => {
  string = ensureString(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Block = (props) => (
  <Box
    border={1}
    borderColor="transparent"
    maxWidth="120px"
    height="120px"
    px="3x"
    mb="3x"
    {...props}
  />
);

const ColorStyleBlock = ({
  colorLabel,
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
  if (colorMode === 'dark') {
    blockProps.borderColor = 'gray:70';
  }
  if (colorMode === 'light') {
    blockProps.borderColor = 'gray:20';
  }
  if (colorType === 'shadow') {
    blockProps.boxShadow = colorValue;
  } else {
    blockProps.backgroundColor = colorValue;
  }

  return (
    <Box>
      <Block {...blockProps} />
      <Box
        mb="2x"
      >
        <Text
          color={primaryTextColor}
          fontSize="md"
          lineHeight="md"
          fontWeight="semibold"
        >
          {colorLabel}
        </Text>
      </Box>
      {colorToken && (
        <>
          <Box
            mb="1x"
          >
            <Tag
              variant="outline"
              color={secondaryTextColor}
              fontFamily="mono"
              fontSize="sm"
              lineHeight="sm"
            >
              {colorToken}
            </Tag>
          </Box>
          <Box
            mb="1x"
          >
            <Text
              color={secondaryTextColor}
              fontSize="sm"
              lineHeight="sm"
            >
              {colorValue}
            </Text>
          </Box>
        </>
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
  const primaryTextColor = colorStyle.text.primary;
  const iconColor = theme.colors['yellow:50'];
  const colorStyleOfType = _get(colorStyle, colorType);
  const colorStyleBlocks = Object.keys(colorStyleOfType)
    .map(colorKey => {
      const colorLabel = capitalizeFirstLetter(colorKey);
      const originalColorValue = _get(colorStyle, `${colorType}.${colorKey}`);
      const colorToken = _has(theme, ['colors', originalColorValue]) ? originalColorValue : null;
      const colorValue = _get(theme, ['colors', originalColorValue]) ?? originalColorValue;

      if (Array.isArray(colorStyleOfType)) {
        colorKey = '#' + (Number(colorKey) + 1);
      }

      /**
       * Example:
       *
       * {
       *   background: {
       *     secondary: 'gray:90',
       *   }
       * }
       *
       * colorLabel = 'Secondary'
       * colorType  = 'background'
       * colorKey   = 'secondary'
       * colorToken = 'gray:90'
       * colorValue = '#212121'
       */
      return {
        colorLabel,
        colorType,
        colorKey,
        colorToken,
        colorValue,
      };
    });
  const baseProps = {
    dark: {
      bg: 'gray:100',
      border: 1,
      borderColor: 'gray:70',
    },
    light: {
      bg: 'white',
      border: 1,
      borderColor: 'gray:20',
    },
  }[colorMode];

  return (
    <Box
      px="10x"
      py="8x"
      {...baseProps}
      {...props}
    >
      <Box
        fontWeight="semibold"
        color={primaryTextColor}
        mb="5x"
      >
        {colorMode === 'dark' && (
          <Flex align="center">
            <Icon icon="moon" size={24} color={iconColor} />
            <Space width="2x" />
            <Text>Dark Mode</Text>
          </Flex>
        )}
        {colorMode === 'light' && (
          <Flex align="center">
            <Icon icon="sun" size={24} color={iconColor} />
            <Space width="2x" />
            <Text>Light Mode</Text>
          </Flex>
        )}
      </Box>
      <Grid
        rowGap="8x"
        columnGap="12x"
        templateColumns="repeat(auto-fit, calc(120px + 24px))"
      >
        {colorStyleBlocks.map(({ colorLabel, colorType, colorKey, colorValue, colorToken }) => {
          return (
            <ColorStyleBlock
              key={colorKey}
              colorLabel={colorLabel}
              colorType={colorType}
              colorKey={colorKey}
              colorValue={colorValue}
              colorToken={colorToken}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default ColorStyleBlocks;
