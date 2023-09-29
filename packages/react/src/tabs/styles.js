import { useTheme } from '../theme';
import { useColorMode } from '../color-mode';

const useTabStyle = ({
  disabled,
  isSelected,
  orientation,
  tabIndex,
  variant,
}) => {
  const theme = useTheme();
  const { sizes } = theme;
  const [colorMode] = useColorMode();
  const getCursorStyle = () => {
    if (disabled) {
      return 'not-allowed';
    }
    if (isSelected) {
      return 'default';
    }
    return 'pointer';
  };

  if (variant === 'default') {
    // border color
    const disabledBorderColor = 'transparent';
    const focusVisibleBorderColor = {
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
      if (disabled && isSelected) {
        // Returns the selected border color if the tab is both disabled and selected
        return selectedBorderColor;
      }
      if (disabled) {
        // Returns the disabled border color if the tab is disabled
        return disabledBorderColor;
      }
      if (isSelected) {
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
      if (isSelected) {
        // Returns the selected color if the tab is selected
        return selectedColor;
      }
      // Returns the fallback color
      return fallbackColor;
    };

    const borderColorKey = {
      'horizontal': 'borderBottomColor',
      'vertical': 'borderLeftColor',
    }[orientation];
    const borderStyleKey = {
      'horizontal': 'borderBottomStyle',
      'vertical': 'borderLeftStyle',
    }[orientation];
    const borderWidthKey = {
      'horizontal': 'borderBottomWidth',
      'vertical': 'borderLeftWidth',
    }[orientation];

    const paddingStyle = (() => {
      if (orientation === 'horizontal') {
        return {
          px: '4x',
          pt: `calc(${sizes?.['2x']} + ${sizes?.['1h']})`,
          pb: '2x',
        };
      }

      if (orientation === 'vertical') {
        return {
          pl: `calc(${sizes?.['4x']} - ${sizes?.['1h']})`,
          pr: '4x',
          py: `calc(${sizes?.['2x']} + ${sizes?.['1h']})`,
        };
      }

      return {};
    })();

    return {
      fontSize: 'sm',
      lineHeight: 'sm',
      color: getColorStyleWithFallback(color),
      cursor: getCursorStyle(),
      display: 'flex',
      alignItems: 'center',
      ...paddingStyle,
      [borderColorKey]: 'transparent',
      [borderStyleKey]: 'solid',
      [borderWidthKey]: '1h',
      outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
      _hover: {
        [borderColorKey]: getBorderColorStyleWithFallback(hoverBorderColor),
        [borderStyleKey]: 'solid',
        [borderWidthKey]: '1h',
        color: getColorStyleWithFallback(hoverColor),
      },
      _focusVisible: {
        outlineColor: focusVisibleBorderColor,
        outlineWidth: '1h',
        outlineStyle: 'solid',
        outlineOffset: '-1h',
        color: getColorStyleWithFallback(focusColor),
      },
      _selected: {
        [borderColorKey]: getBorderColorStyleWithFallback(selectedBorderColor),
        [borderStyleKey]: 'solid',
        [borderWidthKey]: '1h',
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
      light: 'gray:30',
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
    const focusVisibleBorderColor = {
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
      if (isSelected) {
        // Returns the selected background color if the tab is selected
        return selectedBackgroundColor;
      }
      // Returns the fallback color
      return fallbackBackgroundColor;
    };

    const getBorderColorStyleWithFallback = (fallbackBorderColor) => {
      if (disabled && isSelected) {
        // Returns the selected border color if the tab is both disabled and selected
        return selectedBorderColor;
      }
      if (disabled) {
        // Returns the disabled border color if the tab is disabled
        return disabledBorderColor;
      }
      if (isSelected) {
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
      if (isSelected) {
        // Returns the selected color if the tab is selected
        return selectedColor;
      }
      // Returns the fallback color
      return fallbackColor;
    };

    const marginStyle = (() => {
      if (orientation === 'horizontal') {
        return {
          mr: '-1q',
          _lastOfType: {
            mr: 0,
          },
        };
      }

      if (orientation === 'vertical') {
        return {
          mb: '-1q',
          _lastOfType: {
            mb: 0,
          },
        };
      }

      return {};
    })();

    const paddingStyle = (() => {
      if (orientation === 'horizontal') {
        return {
          px: `calc(${sizes?.['4x']} - ${sizes?.['1q']})`,
          py: `calc(${sizes?.['10q']} - ${sizes?.['1q']})`,
        };
      }

      if (orientation === 'vertical') {
        return {
          pl: `calc(${sizes?.['4x']} - ${sizes?.['1h']})`,
          pr: '4x',
          py: `calc(${sizes?.['2x']} + ${sizes?.['1h']})`,
        };
      }

      return {};
    })();

    return {
      fontSize: 'sm',
      lineHeight: 'sm',
      backgroundColor: getBackgroundColorStyleWithFallback(backgroundColor),
      borderColor: getBorderColorStyleWithFallback(borderColor),
      borderStyle: 'solid',
      borderWidth: '1q',
      color: getColorStyleWithFallback(color),
      cursor: getCursorStyle(),
      display: 'flex',
      alignItems: 'center',
      ...marginStyle,
      ...paddingStyle,
      _hover: {
        backgroundColor: getBackgroundColorStyleWithFallback(hoverBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(hoverBorderColor),
        color: getColorStyleWithFallback(hoverColor),
      },
      _focusVisible: {
        backgroundColor: getBackgroundColorStyleWithFallback(focusBackgroundColor),
        color: getColorStyleWithFallback(focusColor),
        outlineColor: focusVisibleBorderColor,
        outlineWidth: '1h',
        outlineStyle: 'solid',
        outlineOffset: '-1h',
        zIndex: 1,
      },
      _selected: {
        backgroundColor: getBackgroundColorStyleWithFallback(selectedBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(selectedBorderColor),
        color: getColorStyleWithFallback(selectedColor),
      },
    };
  }

  return {
    cursor: getCursorStyle(),
    display: 'flex',
    alignItems: 'center',
  };
};

const useTabsStyle = ({
  orientation,
}) => {
  const flexDirection = {
    'horizontal': 'column',
    'vertical': 'row',
  }[orientation];

  return {
    display: 'flex',
    flexDirection,
  };
};

const useTabListStyle = ({
  orientation,
}) => {
  const flexDirection = {
    'horizontal': 'row',
    'vertical': 'column',
  }[orientation];

  return {
    display: 'flex',
    flexDirection,
  };
};

const useTabPanelStyle = ({
  tabIndex,
}) => {
  return {
    // Remove the default outline for accessibility reasons, even when the TabPanel is focused using the keyboard (regardless of the tabIndex value specified on the TabPanel).
    outline: 0,
  };
};

export {
  useTabStyle,
  useTabsStyle,
  useTabListStyle,
  useTabPanelStyle,
};
