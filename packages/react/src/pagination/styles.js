import { useColorMode } from '../color-mode';

const usePaginationButtonStyle = () => {
  const [colorMode] = useColorMode();
  const selectedBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];

  return {
    transition: 'none',
    _selected: {
      borderColor: selectedBorderColor,
    },
  };
};

export {
  usePaginationButtonStyle,
};
