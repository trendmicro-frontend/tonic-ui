import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  px: '4x',
  py: '2x',
};

const getAppearanceProps = ({
  theme,
  colorMode,
  appearance,
}) => {
  const { sizes } = theme;
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const appearanceStyle = {
    success: {
      borderLeftColor: 'green:50',
      borderLeftStyle: 'solid',
      borderLeftWidth: get(sizes, '1x'),
      pl: '3x',
    },
    info: {
      borderLeftColor: 'blue:50',
      borderLeftStyle: 'solid',
      borderLeftWidth: get(sizes, '1x'),
      pl: '3x',
    },
    warning: {
      borderLeftColor: 'yellow:50',
      borderLeftStyle: 'solid',
      borderLeftWidth: get(sizes, '1x'),
      pl: '3x',
    },
    error: {
      borderLeftColor: 'red:60',
      borderLeftStyle: 'solid',
      borderLeftWidth: get(sizes, '1x'),
      pl: '3x',
    },
  }[appearance];

  return {
    backgroundColor,
    color,
    ...appearanceStyle,
  };
};

const useToastRootStyle = ({
  appearance,
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = {
    theme,
    colorMode,
    appearance,
  };
  const appearanceProps = getAppearanceProps(_props);

  return {
    ...baseProps,
    ...appearanceProps,
  };
};

const useToastIconStyle = ({
  appearance,
}) => {
  const color = {
    'success': 'green:50',
    'info': 'blue:50',
    'warning': 'yellow:50',
    'error': 'red:60',
  }[appearance];

  return {
    color,
    py: '1x',
    lineHeight: 1, // exactly the same height as the icon's height
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
    dark: 'black:primary',
    light: 'black:primary',
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
  useToastIconStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
};
