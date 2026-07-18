import React from 'react';
import { theme, Box } from '@tonic-ui/react';

// theme is the default theme object
const defaultTheme = theme;

// Access theme scales
const colors = theme.colors;
const fontSizes = theme.fontSizes;
const space = theme.space;
const sizes = theme.sizes;
const borders = theme.borders;
const radii = theme.radii;
const shadows = theme.shadows;
const zIndices = theme.zIndices;
const lineHeights = theme.lineHeights;
const fontWeights = theme.fontWeights;
const fonts = theme.fonts;
const outlines = theme.outlines;

// Access CSS variable properties (from createTheme)
const prefix = theme.cssVariablePrefix;
const rootSelector = theme.rootSelector;
const cssVars = theme.cssVariables;

// Access nested color tokens
const textColor = theme.colors.text;
const bgColor = theme.colors.background;

// Assign theme values to Box
<Box
  color={theme.colors.text.primary}
  backgroundColor={theme.colors.background.primary}
  fontSize={theme.fontSizes.md}
  padding={theme.space['4x']}
  borderRadius={theme.radii.sm}
  fontWeight={theme.fontWeights.semibold}
  lineHeight={theme.lineHeights.normal}
  fontFamily={theme.fonts.base}
>
  Themed box
</Box>;
