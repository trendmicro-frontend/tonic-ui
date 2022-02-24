import { useTheme } from '../theme';
import { useColorMode } from '../color-mode';

const useTabStyle = ({
  disabled,
  isActive,
  variant,
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const getCursorStyle = () => {
    if (disabled) {
      return 'not-allowed';
    }
    if (isActive) {
      return 'default';
    }
    return 'pointer';
  };

  if (variant === 'default') {
    // border color
    const disabledBorderColor = 'transparent';
    const focusBorderColor = {
      dark: 'blue:60',
      light: 'blue:60',
    }[colorMode];
    const hoverBorderColor = {
      dark: 'gray:60',
      light: 'gray:60',
    }[colorMode];
    const selectedBorderColor = {
      dark: 'red:60',
      light: 'red:60',
    }[colorMode];

    // color
    const color = {
      dark: 'white:secondary',
      light: 'black:secondary',
    }[colorMode];
    const disabledColor = {
      dark: 'white:disabled',
      light: 'black:disabled',
    }[colorMode];
    const focusColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];
    const hoverColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];
    const selectedColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];

    const getBorderColorStyleWithFallback = (fallbackBorderColor) => {
      if (disabled && isActive) {
        // Returns the selected border color if the tab is both disabled and active
        return selectedBorderColor;
      }
      if (disabled) {
        // Returns the disabled border color if the tab is disabled
        return disabledBorderColor;
      }
      if (isActive) {
        // Returns the selected border color if the tab is selected
        return selectedBorderColor;
      }
      // Returns the fallback border color
      return fallbackBorderColor;
    };

    const getColorStyleWithFallback = (fallbackColor) => {
      if (disabled) {
        // Returns the disabled color if the tab is disabled
        return disabledColor;
      }
      if (isActive) {
        // Returns the selected color if the tab is selected
        return selectedColor;
      }
      // Returns the fallback color
      return fallbackColor;
    };

    return {
      fontSize: 'sm',
      lineHeight: 'sm',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '1h',
      color: getColorStyleWithFallback(color),
      cursor: getCursorStyle(),
      px: '3x',
      py: '2x',
      _hover: {
        border: 'none',
        px: `calc(${theme?.sizes['3x']} + ${theme?.sizes['1h']})`,
        pt: `calc(${theme?.sizes['2x']} + ${theme?.sizes['1h']})`,
        borderBottomColor: getBorderColorStyleWithFallback(hoverBorderColor),
        borderBottomStyle: 'solid',
        borderBottomWidth: '1h',
        color: getColorStyleWithFallback(hoverColor),
      },
      _focus: {
        borderColor: getBorderColorStyleWithFallback(focusBorderColor),
        color: getColorStyleWithFallback(focusColor),
      },
      _selected: {
        border: 'none',
        px: `calc(${theme?.sizes['3x']} + ${theme?.sizes['1h']})`,
        pt: `calc(${theme?.sizes['2x']} + ${theme?.sizes['1h']})`,
        borderBottomColor: getBorderColorStyleWithFallback(selectedBorderColor),
        borderBottomStyle: 'solid',
        borderBottomWidth: '1h',
        color: getColorStyleWithFallback(selectedColor),
      },
    };
  }

  if (variant === 'filled') {
    // background color
    const backgroundColor = {
      dark: 'gray:90',
      light: 'gray:30',
    }[colorMode];
    const disabledBackgroundColor = {
      dark: 'gray:90',
      light: 'gray:20',
    }[colorMode];
    const focusBackgroundColor = {
      dark: 'gray:90',
      light: 'gray:20',
    }[colorMode];
    const hoverBackgroundColor = {
      dark: 'gray:70',
      light: 'gray:10',
    }[colorMode];
    const selectedBackgroundColor = {
      dark: 'gray:80',
      light: 'gray:20',
    }[colorMode];

    // border color
    const borderColor = {
      dark: 'gray:80',
      light: 'gray:20',
    }[colorMode];
    const disabledBorderColor = {
      dark: 'gray:80',
      light: 'gray:20',
    }[colorMode];
    const focusBorderColor = {
      dark: 'blue:60',
      light: 'blue:60',
    }[colorMode];
    const hoverBorderColor = {
      dark: 'gray:70',
      light: 'gray:20',
    }[colorMode];
    const selectedBorderColor = {
      dark: 'gray:80',
      light: 'gray:20',
    }[colorMode];

    // color
    const color = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];
    const disabledColor = {
      dark: 'white:disabled',
      light: 'black:disabled',
    }[colorMode];
    const focusColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];
    const hoverColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];
    const selectedColor = {
      dark: 'white:primary',
      light: 'black:primary',
    }[colorMode];

    const getBackgroundColorStyleWithFallback = (fallbackBackgroundColor) => {
      if (disabled) {
        // Returns the disabled background color if the tab is disabled
        return disabledBackgroundColor;
      }
      if (isActive) {
        // Returns the selected background color if the tab is selected
        return selectedBackgroundColor;
      }
      // Returns the fallback color
      return fallbackBackgroundColor;
    };

    const getBorderColorStyleWithFallback = (fallbackBorderColor) => {
      if (disabled && isActive) {
        // Returns the selected border color if the tab is both disabled and active
        return selectedBorderColor;
      }
      if (disabled) {
        // Returns the disabled border color if the tab is disabled
        return disabledBorderColor;
      }
      if (isActive) {
        // Returns the selected border color if the tab is selected
        return selectedBorderColor;
      }
      // Returns the fallback border color
      return fallbackBorderColor;
    };

    const getColorStyleWithFallback = (fallbackColor) => {
      if (disabled) {
        // Returns the disabled color if the tab is disabled
        return disabledColor;
      }
      if (isActive) {
        // Returns the selected color if the tab is selected
        return selectedColor;
      }
      // Returns the fallback color
      return fallbackColor;
    };

    return {
      fontSize: 'sm',
      lineHeight: 'sm',
      backgroundColor: getBackgroundColorStyleWithFallback(backgroundColor),
      borderColor: getBorderColorStyleWithFallback(borderColor),
      borderStyle: 'solid',
      borderWidth: '1q',
      color: getColorStyleWithFallback(color),
      cursor: getCursorStyle(),
      px: `calc(${theme?.sizes['3x']} + ${theme?.sizes['1q']})`,
      py: `calc(${theme?.sizes['2x']} + ${theme?.sizes['1q']})`,
      mr: '-1q',
      _hover: {
        backgroundColor: getBackgroundColorStyleWithFallback(hoverBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(hoverBorderColor),
        color: getColorStyleWithFallback(hoverColor),
      },
      _focus: {
        backgroundColor: getBackgroundColorStyleWithFallback(focusBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(focusBorderColor),
        borderStyle: 'solid',
        borderWidth: '1h',
        color: getColorStyleWithFallback(focusColor),
        px: '3x',
        py: '2x',
        zIndex: 1,
      },
      _selected: {
        backgroundColor: getBackgroundColorStyleWithFallback(selectedBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(selectedBorderColor),
        color: getColorStyleWithFallback(selectedColor),
      },
      _lastOfType: {
        mr: 0,
      },
    };
  }

  return {
    cursor: getCursorStyle(),
  };
};

const useTabListStyle = () => {
  return {
    display: 'flex',
  };
};

const useTabPanelStyle = ({
  isActive,
  variant,
}) => {
  return {};
};

export {
  useTabStyle,
  useTabListStyle,
  useTabPanelStyle,
};
