import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  userSelect: 'none',
  border: 1,
  borderRadius: 'circle',
  transition: 'background-color 120ms, box-shadow 250ms',
};

const interactionProps = ({ color, colorMode, theme: { colors } }) => {
  // icon color
  const _color = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const hoverColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const disabledColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];

  // border color
  const borderColor = {
    dark: 'gray:50',
    light: 'gray:40',
  }[colorMode];
  const hoverBorderColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];
  const checkedBorderColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const checkedAndHoverBorderColor = hoverBorderColor;
  const checkedAndDisabledBorderColor = disabledBorderColor;

  // focus color
  const focusOutlineColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];

  return {
    borderColor: borderColor,
    _hover: {
      borderColor: hoverBorderColor,
    },
    _focus: {
      boxShadow: `0 0 0 2px ${get(colors, focusOutlineColor)}`,
    },
    _disabled: {
      borderColor: disabledBorderColor,
      opacity: 0.28,
    },
    _checked: {
      borderColor: checkedBorderColor,
      color: _color,
    },
    _checkedAndHover: {
      borderColor: checkedAndHoverBorderColor,
      color: hoverColor,
    },
    _checkedAndDisabled: {
      borderColor: checkedAndDisabledBorderColor,
      color: disabledColor,
      opacity: 0.28,
    },
  };
};

const useRadioStyle = props => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...interactionProps(_props),
  };
};

export default useRadioStyle;
