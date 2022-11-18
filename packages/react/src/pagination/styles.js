import { useColorMode } from '../color-mode';

const usePaginationStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
};

const usePaginationItemStyle = () => {
  const [colorMode] = useColorMode();
  const selectedBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];

  return {
    transition: 'none', // avoid unwanted transition effects on buttons
    _selected: {
      borderColor: selectedBorderColor,
    },
  };
};

export {
  usePaginationStyle,
  usePaginationItemStyle,
};
