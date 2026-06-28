import { useTheme } from '../theme';

const useTabStyle = ({
  disabled,
  isSelected,
  orientation,
  tabIndex,
  variant,
}) => {
  const theme = useTheme();
  const { sizes, borders } = theme;
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
    const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
    const hoverBorderColor = 'border._primary.hovered';
    const selectedBorderColor = 'border._primary.selected';

    // color
    const color = 'text.secondary';
    const disabledColor = 'text.disabled';
    const focusColor = 'text.secondary';
    const hoverColor = 'text.accent';
    const selectedColor = 'text.accent';

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
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: '-1h',
        outlineStyle: 'solid',
        outlineWidth: '1h',
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
    const backgroundColor = '_foreground.subtle.enabled';
    const disabledBackgroundColor = '_foreground.subtle.disabled';
    const focusBackgroundColor = '_foreground.subtle.enabled';
    const hoverBackgroundColor = '_foreground.subtle.hovered';
    const selectedBackgroundColor = '_foreground.subtle.selected';

    // border width
    const borderWidth = borders['1.5'].split(' ')[0];
    const hoveredSelectedBorderWidth = borders['2'].split(' ')[0];

    // border color
    const borderColor = 'border.tertiary';
    const disabledBorderColor = 'border._primary.disabled';
    const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
    const hoverBorderColor = 'border.tertiary';
    const selectedBorderColor = 'border.tertiary';

    // border top
    const disabledBorderTopColor = 'border._primary.disabled';
    const hoverBorderTopColor = 'border._primary.hovered';
    const selectedBorderTopColor = 'border._primary.selected';

    // color
    const color = 'text.secondary';
    const disabledColor = 'text.disabled';
    const focusColor = 'text.secondary';
    const hoverColor = 'text.accent';
    const selectedColor = 'text.accent';

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

    const getBorderTopColorStyleWithFallback = (fallbackBorderTopColor) => {
      if (disabled && isSelected) {
        // Returns the selected border top color if the tab is both disabled and selected
        return selectedBorderTopColor;
      }
      if (disabled) {
        // Returns the disabled border top color if the tab is disabled
        return disabledBorderTopColor;
      }
      if (isSelected) {
        // Returns the selected border top color if the tab is selected
        return selectedBorderTopColor;
      }
      // Returns the fallback border top color
      return fallbackBorderTopColor;
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
      'horizontal': 'borderTopColor',
      'vertical': 'borderLeftColor',
    }[orientation];
    const borderWidthKey = {
      'horizontal': 'borderTopWidth',
      'vertical': 'borderLeftWidth',
    }[orientation];
    const paddingKey = {
      'horizontal': 'pt',
      'vertical': 'pl',
    }[orientation];

    const marginStyle = (() => {
      if (orientation === 'horizontal') {
        return {
          mr: -1.5,
          _lastOfType: {
            mr: 0,
          },
        };
      }

      if (orientation === 'vertical') {
        return {
          mb: -1.5,
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
          px: `calc(${sizes?.['4x']} - ${borderWidth})`,
          py: `calc(${sizes?.['10q']} - ${borderWidth})`,
        };
      }

      if (orientation === 'vertical') {
        return {
          px: `calc(${sizes?.['4x']} - ${borderWidth})`,
          py: `calc(${sizes?.['10q']} - ${borderWidth})`,
        };
      }

      return {};
    })();

    const hoveredSelectedPaddingAdjustment = (() => {
      if (orientation === 'horizontal') {
        return `calc(${sizes?.['10q']} - ${hoveredSelectedBorderWidth})`;
      }

      if (orientation === 'vertical') {
        return `calc(${sizes?.['4x']} - ${hoveredSelectedBorderWidth})`;
      }

      return '';
    })();

    return {
      fontSize: 'sm',
      lineHeight: 'sm',
      backgroundColor: getBackgroundColorStyleWithFallback(backgroundColor),
      borderColor: getBorderColorStyleWithFallback(borderColor),
      borderStyle: 'solid',
      borderWidth,
      color: getColorStyleWithFallback(color),
      cursor: getCursorStyle(),
      display: 'flex',
      alignItems: 'center',
      ...marginStyle,
      ...paddingStyle,
      _hover: {
        backgroundColor: getBackgroundColorStyleWithFallback(hoverBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(hoverBorderColor),
        [borderColorKey]: getBorderTopColorStyleWithFallback(hoverBorderTopColor),
        color: getColorStyleWithFallback(hoverColor),
        [borderWidthKey]: hoveredSelectedBorderWidth,
        [paddingKey]: hoveredSelectedPaddingAdjustment,
      },
      _focusVisible: {
        backgroundColor: getBackgroundColorStyleWithFallback(focusBackgroundColor),
        color: getColorStyleWithFallback(focusColor),
        outlineColor: focusVisibleOutlineColor,
        outlineWidth: '1h',
        outlineStyle: 'solid',
        outlineOffset: '-1h',
        zIndex: 1,
      },
      _selected: {
        backgroundColor: getBackgroundColorStyleWithFallback(selectedBackgroundColor),
        borderColor: getBorderColorStyleWithFallback(selectedBorderColor),
        [borderColorKey]: getBorderTopColorStyleWithFallback(selectedBorderTopColor),
        color: getColorStyleWithFallback(selectedColor),
        [borderWidthKey]: hoveredSelectedBorderWidth,
        [paddingKey]: hoveredSelectedPaddingAdjustment,
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
