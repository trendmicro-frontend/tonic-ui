import {
  Box,
  Stack,
  Tag,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

const baseWidth = 120;
const baseHeight = 120;

const ColorStyleBlock = ({
  colorLabel,
  colorType,
  colorTokens,
  colorValues,
  ...props
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  // Helper function to resolve v4 semantic token format
  const resolveColorValue = (value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if ('_dark' in value || '_light' in value) {
        return colorMode === 'dark' ? value._dark : value._light;
      }
    }
    return value;
  };

  const primaryTextColor = resolveColorValue(colorStyle?.color?.primary);
  const secondaryTextColor = resolveColorValue(colorStyle?.color?.secondary);
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
    <Box {...props}>
      <Box
        maxWidth={baseWidth}
        height={baseHeight}
        px="3x"
        mb="4x"
        {...blockStyle}
      />
      <Box
        mb="3x"
      >
        {colorLabel ? (
          <Text
            color={primaryTextColor}
            fontSize="md"
            lineHeight="md"
            fontWeight="semibold"
          >
            {colorLabel}
          </Text>
        ) : null}
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
            {colorValues.map((colorValue, index) => {
              // Ensure we don't try to render an object
              const displayValue = typeof colorValue === 'object' ? JSON.stringify(colorValue) : colorValue;
              return (
                <Text
                  // eslint-disable-next-line react/no-array-index-key
                  key={displayValue + index}
                  color={secondaryTextColor}
                  fontFamily="mono"
                  fontSize="sm"
                  lineHeight="sm"
                >
                  {displayValue}
                </Text>
              );
            })}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ColorStyleBlock;
