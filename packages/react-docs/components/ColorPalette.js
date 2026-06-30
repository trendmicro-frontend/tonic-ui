import { Box, Flex, Stack, useTheme } from '@tonic-ui/react';
import { AngleRightIcon, AngleDownIcon } from '@tonic-ui/react-icons';
import { useState, useMemo } from 'react';

const ColorPalette = ({ hue }) => {
  const theme = useTheme();
  const colorTokens = useMemo(() => theme.colors?.[hue] || {}, [theme.colors, hue]);
  const [expandedShade, setExpandedShade] = useState(null);

  // Build shade entries, detecting objects with { main, lighten, darken }
  const shadeEntries = useMemo(() => {
    return Object.keys(colorTokens)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(shade => {
        const value = colorTokens[shade];
        const isObject = value && typeof value === 'object' && value.main;

        if (isObject) {
          const lightenSteps = Object.keys(value.lighten || {})
            .map(Number)
            .sort((a, b) => b - a); // Descending: 400, 320, ..., 80
          const darkenSteps = Object.keys(value.darken || {})
            .map(Number)
            .sort((a, b) => a - b); // Ascending: 80, 160, ..., 400

          return {
            shade,
            backgroundColor: value.main,
            lighten: lightenSteps.map(step => ({
              step,
              label: `${shade}-L-${step}`,
              token: `${hue}.${shade}.lighten.${step}`,
              backgroundColor: value.lighten[step],
            })),
            darken: darkenSteps.map(step => ({
              step,
              label: `${shade}-D-${step}`,
              token: `${hue}.${shade}.darken.${step}`,
              backgroundColor: value.darken[step],
            })),
            hasVariants: true,
          };
        }

        return {
          shade,
          backgroundColor: value,
          lighten: [],
          darken: [],
          hasVariants: false,
        };
      });
  }, [colorTokens, hue]);

  const toggleExpand = (shade) => {
    setExpandedShade(prev => (prev === shade ? null : shade));
  };

  const getTextColor = (shade) => {
    if (hue === 'black') {
      return 'white';
    }
    if (hue === 'white') {
      return 'black';
    }

    const numericShade = parseInt(String(shade).split('-')[0], 10);
    return (!isNaN(numericShade) && numericShade >= 500) ? 'white' : 'black';
  };

  return (
    <Flex alignItems="flex-start" position="relative">
      {/* Backdrop */}
      {expandedShade ? (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="_overlay.fixed.light.thicker"
          zIndex={15}
          onClick={() => setExpandedShade(null)}
        />
      ) : null}

      <Stack direction="column" spacing="1px">
        {shadeEntries.map(({ shade, backgroundColor, lighten, darken, hasVariants }) => {
          const token = `${hue}.${shade}`;
          const color = getTextColor(shade);
          const isExpanded = expandedShade === shade;

          return (
            <Box key={shade} position="relative">
              <Flex
                justifyContent="space-between"
                fontSize="sm"
                width={300}
                height="12x"
                py="3x"
                px="4x"
                lineHeight="lg"
                fontFamily="mono"
                backgroundColor={backgroundColor}
                color={color}
                cursor={hasVariants ? 'pointer' : 'default'}
                onClick={() => hasVariants && toggleExpand(shade)}
                _hover={hasVariants ? { opacity: 0.9 } : {}}
                position="relative"
                zIndex={isExpanded ? 10 : 1}
              >
                <Flex alignItems="center" columnGap="2x">
                  {hasVariants ? (
                    <Box display="flex" alignItems="center">
                      {isExpanded ? <AngleDownIcon size="3x" /> : <AngleRightIcon size="3x" />}
                    </Box>
                  ) : null}
                  <Box>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade}</Box>
                </Flex>
                <Box>{token}</Box>
              </Flex>

              {hasVariants && isExpanded ? (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width={300}
                  zIndex={20}
                  boxShadow="dark.lg"
                >
                  {/* Lighten variants */}
                  {lighten.map(({ label, token: variantToken, backgroundColor: variantBgColor }) => {
                    const variantColor = getTextColor(shade);

                    return (
                      <Flex
                        key={label}
                        justifyContent="space-between"
                        fontSize="xs"
                        width={300}
                        height="10x"
                        py="2x"
                        pl="6x"
                        pr="4x"
                        lineHeight="sm"
                        fontFamily="mono"
                        backgroundColor={variantBgColor}
                        color={variantColor}
                      >
                        <Box>↑ {label}</Box>
                        <Box fontSize="2xs">{variantToken}</Box>
                      </Flex>
                    );
                  })}

                  {/* Base shade (main) */}
                  <Flex
                    justifyContent="space-between"
                    fontSize="sm"
                    width={300}
                    height="12x"
                    py="3x"
                    px="4x"
                    lineHeight="lg"
                    fontFamily="mono"
                    backgroundColor={backgroundColor}
                    color={color}
                    fontWeight="semibold"
                    borderY="2px solid"
                    borderColor={color}
                    cursor="pointer"
                    onClick={() => toggleExpand(shade)}
                    _hover={{ opacity: 0.9 }}
                  >
                    <Flex alignItems="center" columnGap="2x">
                      <Box display="flex" alignItems="center">
                        <AngleDownIcon size="3x" />
                      </Box>
                      <Box>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade} (main)</Box>
                    </Flex>
                    <Box>{token}.main</Box>
                  </Flex>

                  {/* Darken variants */}
                  {darken.map(({ label, token: variantToken, backgroundColor: variantBgColor }) => {
                    const variantColor = getTextColor(shade);

                    return (
                      <Flex
                        key={label}
                        justifyContent="space-between"
                        fontSize="xs"
                        width={300}
                        height="10x"
                        py="2x"
                        pl="6x"
                        pr="4x"
                        lineHeight="sm"
                        fontFamily="mono"
                        backgroundColor={variantBgColor}
                        color={variantColor}
                      >
                        <Box>↓ {label}</Box>
                        <Box fontSize="2xs">{variantToken}</Box>
                      </Flex>
                    );
                  })}
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Stack>
    </Flex>
  );
};

export default ColorPalette;
