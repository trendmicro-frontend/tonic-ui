import useColorMode from '../useColorMode';

const baseProps = {
  pl: '4x',
  pr: '4x',
  py: '4x',
};

const useToastRootStyle = () => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    dark: 'gray:10',
    light: 'gray:10',
  }[colorMode];
  const color = 'black:primary';

  return {
    ...baseProps,
    backgroundColor,
    color,
  };
};

const useToastMessageStyle = () => {
  return {
    width: '100%',
  };
};

const useToastCloseButtonStyle = () => {
  return {
    border: 2,
    borderColor: 'transparent',
    color: 'black',
    lineHeight: 1,
    width: '8x',
    height: '8x',
    mt: -8,
    mr: -8,
    px: 0,
    py: 0,
    opacity: 0.54,
    _hover: {
      opacity: 1,
    },
    _active: {
      opacity: 0.54,
    },
    _focus: {
      border: 2,
      borderColor: 'blue:60',
      opacity: 1,
    },
  };
};

export {
  useToastRootStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
};
