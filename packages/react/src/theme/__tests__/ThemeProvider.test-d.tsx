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

<ThemeProvider theme={{ breakpoints: { values: { sm: 640 } } }} />;
// @ts-expect-error Legacy array config is not accepted.
<ThemeProvider theme={{ breakpoints: ['600px'] }} />;
