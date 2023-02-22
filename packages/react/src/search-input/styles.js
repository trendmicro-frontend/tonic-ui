import { createTransitionStyle } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useSearchInputCloseButtonStyle = ({ size }) => {
  const [colorMode] = useColorMode();
  const { colors, sizes } = useTheme();
  const borderWidth = sizes['1q'];
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const activeColor = color;
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = colors?.['blue:60'];
  const height = {
    sm: sizes['6x'],
    md: sizes['8x'], // default
    lg: sizes['8x'],
  }[size] ?? sizes['8x'];
  const width = {
    sm: sizes['6x'],
    md: sizes['8x'], // default
    lg: sizes['8x'],
  }[size] ?? sizes['8x'];
  const minWidth = width;
  const mr = {
    sm: '-2x',
    md: '-3x', // default
    lg: '-3x',
  }[size] ?? '-3x';

  return {
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth,
    color: color,
    transition: createTransitionStyle(['border-color', 'color'], { duration: 200 }),
    lineHeight: 1, // Ensure the element height to match the height of the icon
    height: `calc(${height} - ${borderWidth} - ${borderWidth})`,
    width,
    minWidth, // ensure a minimum width for the close button
    mr,
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
  useSearchInputCloseButtonStyle,
};
