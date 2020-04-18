import useColorMode from '../useColorMode';

const baseProps = {
  pl: '4x',
  pr: '4x',
  py: '4x',
};

const useToastStyle = () => {
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

export {
  useToastStyle,
};
