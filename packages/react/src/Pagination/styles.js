import { setColorWithOpacity } from '../theme/colors';
import { useColorMode } from '../ColorMode';

const useSelectedButtonStyle = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: setColorWithOpacity('black', 0.12),
    light: setColorWithOpacity('black', 0.08),
  }[colorMode];
  const borderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const color = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];

  return {
    backgroundColor,
    borderColor,
    color,
  };
};

export {
  useSelectedButtonStyle,
};
