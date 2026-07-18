import React from 'react';
import { useTheme, Box } from '@tonic-ui/react';

// Access resolved color tokens
function UseThemeColors() {
  const theme = useTheme();
  return (
    <Box
      color={theme.colors.text.primary}
      backgroundColor={theme.colors.background.primary}
    >
      Themed text
    </Box>
  );
}

// Access theme scales
function UseThemeScales() {
  const theme = useTheme();
  return (
    <Box
      fontSize={theme.fontSizes.md}
      padding={theme.space['4x']}
      borderRadius={theme.radii.sm}
      fontWeight={theme.fontWeights.semibold}
      lineHeight={theme.lineHeights.normal}
      fontFamily={theme.fonts.base}
    >
      Scaled box
    </Box>
  );
}

// Use the .get() helper
function UseThemeGet() {
  const theme = useTheme();
  return (
    <Box
      color={theme.get('colors.red.600')}
    >
      Via get()
    </Box>
  );
}
