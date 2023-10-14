import {
  Box,
  Divider,
  Stack,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle, setColorStyle] = useColorStyle({ colorMode });
  const invertedPrimaryColor = {
    dark: 'black:primary',
    light: 'white:primary',
  }[colorMode];

  return (
    <Stack spacing="4x" fontFamily="mono">
      Background
      <Box
        sx={{
          '> *': {
            px: '3x',
            py: '2x',
          },
        }}
      >
        <Box backgroundColor={colorStyle.background.primary}>
          colorStyle.background.primary
        </Box>
        <Box backgroundColor={colorStyle.background.secondary}>
          colorStyle.background.secondary
        </Box>
        <Box backgroundColor={colorStyle.background.tertiary}>
          colorStyle.background.tertiary
        </Box>
        <Box backgroundColor={colorStyle.background.inverted} color={invertedPrimaryColor}>
          colorStyle.background.inverted
        </Box>
        <Box backgroundColor={colorStyle.background.highlighted}>
          colorStyle.background.highlighted
        </Box>
        <Box backgroundColor={colorStyle.background.selected}>
          colorStyle.background.selected
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          '> *': {
            px: '3x',
          },
          '> *:not(:last-child)': {
            pb: '2x',
          },
        }}
      >
        <Box color={colorStyle.color.primary}>
          colorStyle.color.primary
        </Box>
        <Box color={colorStyle.color.secondary}>
          colorStyle.color.secondary
        </Box>
        <Box color={colorStyle.color.tertiary}>
          colorStyle.color.tertiary
        </Box>
        <Box color={colorStyle.color.disabled}>
          colorStyle.color.disabled
        </Box>
        <Box color={colorStyle.color.success}>
          colorStyle.color.success
        </Box>
        <Box color={colorStyle.color.info}>
          colorStyle.color.info
        </Box>
        <Box color={colorStyle.color.warning}>
          colorStyle.color.warning
        </Box>
        <Box color={colorStyle.color.error}>
          colorStyle.color.error
        </Box>
      </Box>
    </Stack>
  );
};

export default App;
