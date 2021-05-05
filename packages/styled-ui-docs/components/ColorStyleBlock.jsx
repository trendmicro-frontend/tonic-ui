import {
  Box,
  Stack,
  Tag,
  Text,
  useColorMode,
  useColorStyle,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const baseWidth = 120;
const baseHeight = 120;

const ColorStyleBlock = ({
  colorLabel,
  colorType,
  colorKey,
  colorTokens,
  colorValues,
  ...props
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const primaryTextColor = colorStyle?.color?.primary;
  const secondaryTextColor = colorStyle?.color?.secondary;
  const blockStyle = (() => {
    const style = {};
    const containerBackgroundColor = {
      dark: 'gray:100',
      light: 'white:emphasis',
    }[colorMode];
    const borderColor = {
      dark: 'gray:70',
      light: 'gray:20',
    }[colorMode];

    if (colorType === 'gradient') {
      const [from, to] = colorValues;
      style.background = `linear-gradient(45deg, ${from}, ${to})`;
      return style;
    }

    if (colorType === 'shadow') {
      style.backgroundColor = {
        dark: 'gray:90',
        light: 'white',
      }[colorMode];
      style.boxShadow = colorValues[0];
      return style;
    }

    style.backgroundColor = colorValues[0];
    if (containerBackgroundColor === colorTokens[0]) {
      style.border = 1;
      style.borderColor = borderColor;
    }

    return style;
  })();

  return (
    <Box>
      <Box
        maxWidth={baseWidth}
        height={baseHeight}
        px="3x"
        mb="3x"
        {...blockStyle}
      />
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
      {colorTokens.length > 0 && (
        <>
          <Stack
            direction="row"
            spacing="2x"
          >
            {colorTokens.map(colorToken => {
              if (!colorToken) {
                return null;
              }

              return (
                <Tag
                  key={colorToken}
                  variant="solid"
                  fontFamily="mono"
                  fontSize="sm"
                  lineHeight="sm"
                  mb="1x"
                >
                  {colorToken}
                </Tag>
              );
            })}
          </Stack>
          <Stack
            direction="row"
            spacing="2x"
            mb="1x"
          >
            {colorValues.map(colorValue => (
              <Text
                key={colorValue}
                color={secondaryTextColor}
                fontFamily="mono"
                fontSize="sm"
                lineHeight="sm"
              >
                {colorValue}
              </Text>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ColorStyleBlock;
