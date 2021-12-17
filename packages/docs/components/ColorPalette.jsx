import { Box, Flex, Stack, useTheme } from '@trendmicro/react-styled-ui';
import {
  ensureString,
} from 'ensure-type';
import React from 'react';

const ColorPalette = ({ hue }) => {
  const theme = useTheme();
  const regex = RegExp(hue, 'g');
  const colorTokens = Object.keys(theme.colors)
    .filter(tokens => tokens.match(regex))
    .reduce((obj, key) => {
      obj[key] = theme.colors[key];
      return obj;
    }, {});

  return (
    <Flex alignItems="center">
      <Stack direction="column">
        {Object.keys(colorTokens).map((token) => {
          const [hue, shade] = ensureString(token).split(':');
          const backgroundColor = colorTokens[token];
          const color = (shade <= 50) ? 'black' : 'white';

          return (
            <Flex
              key={token}
              justifyContent="space-between"
              fontSize="sm"
              width="300px"
              height="12x"
              py="3x"
              px="4x"
              lineHeight="lg"
              fontFamily="mono"
              backgroundColor={backgroundColor}
              color={color}
            >
              <Box>{`${hue.charAt(0).toUpperCase()}${hue.slice(1)}`} {shade}</Box>
              <Box>{color}</Box>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
};

export default ColorPalette;
