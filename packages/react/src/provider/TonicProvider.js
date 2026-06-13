import { ThemeProvider } from '../theme';
import { ColorModeProvider } from '../color-mode';
import { ColorStyleProvider } from '../color-style';
import { CSSBaseline } from '../css-baseline';
import { EnvironmentProvider } from '../environment';

const TonicProvider = ({
  children,
  colorMode: colorModeProps = {},
  colorStyle: colorStyleProps = {},
  environment: environmentProps = {},
  theme,
  useCSSBaseline = false,
}) => {
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

  if (typeof environmentProps !== 'object') {
    console.error(
      'TonicProvider: "environment" prop must be an object if provided.\n' +
      'See https://trendmicro-frontend.github.io/tonic-ui for more information.'
    );
  }

  return (
    <EnvironmentProvider {...environmentProps}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider {...colorModeProps}>
          <ColorStyleProvider {...colorStyleProps}>
            {!!useCSSBaseline && <CSSBaseline />}
            {children}
          </ColorStyleProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </EnvironmentProvider>
  );
};

export default TonicProvider;
