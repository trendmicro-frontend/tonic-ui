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
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider {...colorModeProps}>
        <ColorStyleProvider {...colorStyleProps}>
          {useCSSBaseline && <CSSBaseline />}
          {children}
        </ColorStyleProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default TonicProvider;
