import React from 'react';
import { ThemeProvider } from '../theme';
import { ColorModeProvider } from '../color-mode';
import { ColorStyleProvider } from '../color-style';
import { CSSBaseline } from '../css-baseline';

const TonicProvider = ({
  children,
  colorMode: colorModeProps,
  colorStyle: colorStyleProps,
  theme,
  useCSSBaseline = false,
}) => {
  colorModeProps = colorModeProps ?? {};
  colorStyleProps = colorStyleProps ?? {};

  if (typeof colorModeProps !== 'object') {
    console.error(
      'TonicProvider: "colorMode" prop must be an object if provided.\n' +
      'See https://trendmicro-frontend.github.io/tonic-ui for more information.'
    );
  }

  if (typeof colorStyleProps !== 'object') {
    console.error(
      'TonicProvider: "colorStyle" prop must be an object if provided.\n' +
      'See https://trendmicro-frontend.github.io/tonic-ui for more information.'
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider {...colorModeProps}>
        <ColorStyleProvider {...colorStyleProps}>
          {!!useCSSBaseline && <CSSBaseline />}
          {children}
        </ColorStyleProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default TonicProvider;
