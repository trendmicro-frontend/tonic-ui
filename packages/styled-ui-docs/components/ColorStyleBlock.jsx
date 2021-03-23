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
  const { colorMode } = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const primaryTextColor = colorStyle?.text?.primary;
  const secondaryTextColor = colorStyle?.text?.secondary;
  const blockProps = {};

  if (colorType === 'gradient') {
    const [from, to] = colorValues;
    blockProps.background = `linear-gradient(45deg, ${from}, ${to})`;
    blockProps.boxShadow = colorStyle?.shadow.medium;
  } else if (colorType === 'shadow') {
    blockProps.boxShadow = colorValues[0];
  } else {
    blockProps.backgroundColor = colorValues[0];
    blockProps.boxShadow = colorStyle?.shadow.medium;
  }

  if (colorMode === 'dark') {
    blockProps.borderColor = 'gray:80';
  }
  if (colorMode === 'light') {
    blockProps.borderColor = 'gray:20';
  }

  return (
    <Box>
      <Box
        border={1}
        borderColor="transparent"
        maxWidth={baseWidth}
        height={baseHeight}
        px="3x"
        mb="3x"
        {...blockProps}
      />
      <Box
        mb="2x"
      >
        <Text
          color={primaryTextColor}
          fontSize="md"
          lineHeight="md"
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
                  variant="outline"
                  color={secondaryTextColor}
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
