import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useTextStyle = ({ size }) => {
  const { fontSizes, lineHeights } = useTheme();

  return {
    fontFamily: 'base',
    fontSize: fontSizes?.[size],
    lineHeight: lineHeights?.[size],
  };
};

const useTextLabelStyle = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    color,
  };
};

export {
  useTextStyle,
  useTextLabelStyle,
};
