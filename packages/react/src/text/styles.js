import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useTextStyle = ({ size }) => {
  const { fontSizes, lineHeights } = useTheme();

  return {
    display: 'block',
    fontFamily: 'base',
    fontSize: fontSizes?.[size],
    lineHeight: lineHeights?.[size],
  };
};

const useTextLabelStyle = ({ size }) => {
  const textStyle = useTextStyle({ size });
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    ...textStyle,
    color,
  };
};

export {
  useTextStyle,
  useTextLabelStyle,
};
