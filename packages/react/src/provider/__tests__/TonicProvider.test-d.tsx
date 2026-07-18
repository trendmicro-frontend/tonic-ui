import React from 'react';
import { TonicProvider, theme, createTheme } from '@tonic-ui/react';

// Basic usage
<TonicProvider theme={theme}>
  <div>App content</div>
</TonicProvider>;

// With custom theme
const customTheme = createTheme({});
<TonicProvider theme={customTheme}>
  <div>Custom themed</div>
</TonicProvider>;

// With inline theme object
<TonicProvider theme={{ colors: { primary: 'blue' } }}>
  <div>Inline theme</div>
</TonicProvider>;

// With colorMode - controlled
<TonicProvider theme={theme} colorMode={{ value: 'dark' }}>
  <div>Controlled dark mode</div>
</TonicProvider>;

// With colorMode - uncontrolled
<TonicProvider theme={theme} colorMode={{ defaultValue: 'dark' }}>
  <div>Dark mode default</div>
</TonicProvider>;

// With colorMode - light
<TonicProvider theme={theme} colorMode={{ defaultValue: 'light' }}>
  <div>Light mode default</div>
</TonicProvider>;

// With colorStyle - controlled value
<TonicProvider theme={theme} colorStyle={{ value: { background: { primary: '#fff' } } }}>
  <div>Controlled color style</div>
</TonicProvider>;

// With colorStyle - default value
<TonicProvider theme={theme} colorStyle={{ defaultValue: { background: { primary: '#000' } } }}>
  <div>Custom color style</div>
</TonicProvider>;

// With colorStyle - empty object
<TonicProvider theme={theme} colorStyle={{ defaultValue: {} }}>
  <div>Empty color style</div>
</TonicProvider>;

// With useCSSBaseline
<TonicProvider theme={theme} useCSSBaseline>
  <div>With CSS baseline</div>
</TonicProvider>;

// With useCSSVariables
<TonicProvider theme={theme} useCSSVariables>
  <div>With CSS variables</div>
</TonicProvider>;

// All props combined
<TonicProvider
  theme={theme}
  colorMode={{ defaultValue: 'light' }}
  colorStyle={{}}
  useCSSBaseline
  useCSSVariables
>
  <div>Full config</div>
</TonicProvider>;
