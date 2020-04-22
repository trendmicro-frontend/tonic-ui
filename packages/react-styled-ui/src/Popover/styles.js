import useColorMode from '../useColorMode';
import { setColorWithOpacity } from '../theme/colors';

const baseProps = {
  fontSize: 'sm',
  lineHeight: 'sm',
};

const usePopoverContentStyle = () => {
  const { colorMode } = useColorMode();
  const bg = { dark: 'gray:80', light: 'white' }[colorMode];
  const boxShadow = {
    dark: 'dark.sm',
    light: 'light.sm',
  }[colorMode];
  return {
    bg,
    boxShadow,
    tabIndex: '-1',
    borderWidth: 1,
    p: '3x',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'sm',
    maxWidth: '288px',
    zIndex: 'popover',
    _focus: { outline: 0 }
  };
};

const usePopoverHeaderStyle = () => {
  const { colorMode } = useColorMode();
  const color = { dark: 'white:emphasis', light: 'black:emphasis' }[colorMode];
  return {
    ...baseProps,
    fontWeight: 'semibold',
    color,
    __after: {
      content: '""',
      display: 'block',
      borderTop: 1,
      borderColor: 'gray:60',
      my: '2x',
    },
  };
};

const usePopoverBodyStyle = () => {
  const { colorMode } = useColorMode();
  const color = { dark: 'white:primary', light: 'black:primary' }[colorMode];
  return {
    color,
    ...baseProps,
    flex: '1'
  };
};

const usePopoverCloseButtonStyle = () => {
  const color = setColorWithOpacity('white', 0.47);
  return {
    position: 'absolute',
    top: '3x',
    right: '3x',
    color,
  };
};

export {
  usePopoverContentStyle,
  usePopoverHeaderStyle,
  usePopoverBodyStyle,
  usePopoverCloseButtonStyle,
};
