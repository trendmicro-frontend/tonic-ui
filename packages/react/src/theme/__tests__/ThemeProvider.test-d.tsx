import React from 'react';
import { ThemeProvider, createTheme, theme } from '@tonic-ui/react';

// Basic usage
<ThemeProvider theme={theme}>
  <div>Theme context</div>
</ThemeProvider>;

// With custom theme
const customTheme = createTheme({});
<ThemeProvider theme={customTheme}>
  <div>Custom theme</div>
</ThemeProvider>;
