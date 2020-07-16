import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  px: '4x',
  py: '2x',
};

const useToastRootStyle = () => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
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
    py: 2,
    mt: -1,
    width: '100%',
  };
};

const useToastCloseButtonStyle = () => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const color = {
    dark: 'black:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'black:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const activeColor = color;
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = get(colors, 'blue:60');

  return {
    border: 1,
    borderColor: 'transparent',
    color: color,
    transition: 'all .2s',
    lineHeight: 1,
    height: '8x',
    width: '8x',
    minWidth: '8x', // ensure a minimum width for the close button
    mt: -4,
    mb: -4,
    mr: -8,
    px: 0,
    py: 0,
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _focus: {
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,
      color: focusColor,
    },
    _focusHover: {
      color: focusHoverColor,
    },
    _focusActive: {
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,
      color: focusActiveColor,
    },
  };
};

export {
  useToastRootStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
};
