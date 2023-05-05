import { useColorMode } from '../color-mode';

const useCodeStyle = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    backgroundColor,
    borderRadius: 'sm',
    color,
    fontFamily: 'mono',
    px: '1x',
  };
};

export {
  useCodeStyle,
};
