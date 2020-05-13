import { useContext } from 'react';
import { TabContext } from './context';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';
import { setColorWithOpacity } from '../theme/colors';

const tabSizes = {
  sm: {
    height: '10x',
    fontSize: 'xs',
    lineHeight: 'xs',
    py: '1x',
    px: '3x',
  },
  md: {
    height: '10x',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
    py: '2x'
  },
  lg: {
    height: '10x',
    fontSize: '1.15rem',
    padding: '0.75rem 1rem',
  },
};

export const baseProps = {
  tab: {
    display: 'flex',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: '2px',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  tabList: {
    borderWidth: 0,
    borderBottomWidth: '2px',
    borderColor: 'transparent',
    borderStyle: 'solid'
  }
};

export const statusProps = {
  _focus: {
    zIndex: '3'
  },
  _selected: {
    cursor: 'default'
  },
  _disabled: {
    cursor: 'not-allowed',
  },
};

const lineStyle = ({ color, size, colorMode, theme }) => {
  const _color = { light: theme.colors['black:emphasis'], dark: theme.colors['white:emphasis'] }[colorMode];
  const _fontColor = setColorWithOpacity(_color, 0.6);
  const _hoveredBorderColor = 'gray:60';
  const _focusBorderColor = 'blue:60';
  const _selectedFontColor = _color;
  const _selectedBorderColor = 'red:60';
  const _disabledColor = setColorWithOpacity(_color, 0.28);
  const _disabledBorderColor = 'transparent';
  const _disabledBackgroundColor = _disabledBorderColor;
  const _px = tabSizes[size] ? theme.space[tabSizes[size].px] : theme.space[tabSizes.md.px];
  return {
    tabList: {
      borderBottomWidth: baseProps.tab.borderWidth,
      borderColor: 'transparent',
    },
    tab: {
      color: _fontColor,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      mb: `-${baseProps.tab.borderWidth}`,
      _hover: {
        borderBottomColor: _hoveredBorderColor
      },
      _selected: Object.assign({
        color: _selectedFontColor,
        borderBottomColor: _selectedBorderColor
      }, statusProps._selected),
      _focus: {
        px: `calc(${_px} - 2px)`,
        borderWidth: baseProps.tab.borderWidth,
        borderColor: _focusBorderColor
      },
      _disabled: Object.assign(statusProps._disabled, {
        color: _disabledColor,
        borderColor: _disabledBorderColor,
        backgroundColor: _disabledBackgroundColor
      })
    },
  };
};

// TODO: Create new issue in @styled-system/css to allow custom alias
const enclosedStyle = ({ color, size, colorMode, theme }) => {
  const borderWidth = '1px';
  const _focusBorderWidth = '2px';
  const _px = tabSizes[size] ? theme.space[tabSizes[size].px] : theme.space[tabSizes.md.px];
  const _lineHeight = tabSizes[size] ? theme.lineHeights[tabSizes[size].lineHeight] : theme.lineHeights[tabSizes.md.lineHeight];

  let _color = theme.colors['white:emphasis'];
  let backgroundColor = 'gray:90';
  let borderColor = 'gray:80';
  let _hoveredBorderColor = 'gray:70';
  let _hoveredBgColor = 'gray:70';
  let _focusBorderColor = 'blue:60';
  let _selectedBg = 'gray:80';
  let _selectedBorder = _selectedBg;
  if (colorMode === 'light') {
    _color = theme.colors['black:emphasis'];
    backgroundColor = 'gray:20';
    borderColor = 'gray:30';
    _hoveredBorderColor = 'gray:30';
    _hoveredBgColor = 'gray:10';
    _focusBorderColor = 'blue:60';
    _selectedBg = '#fff';
    _selectedBorder = borderColor;
  }
  const _fontColor = setColorWithOpacity(_color, 0.6);
  const _selectedFontColor = _color;
  const _disabledColor = setColorWithOpacity(_color, 0.28);

  return {
    tab: {
      color: _fontColor,
      borderWidth,
      borderColor,
      backgroundColor,
      px: `calc(${_px} - ${borderWidth})`,
      py: `calc((${theme.space[tabSizes[size].height]} - ${_lineHeight} - (${borderWidth} * 2)) / 2)`,
      mr: '-1px',
      mb: '-1px',

      _focus: {
        borderColor: _focusBorderColor,
        borderWidth: _focusBorderWidth,
        px: `calc(${_px} - ${_focusBorderWidth})`,
        py: `calc((${theme.space[tabSizes[size].height]} - ${_lineHeight} - (${_focusBorderWidth} * 2)) / 2)`,
        zIndex: 3
      },

      _focusHover: {
        borderColor: _focusBorderColor
      },

      _hover: {
        borderColor: _hoveredBorderColor,
        backgroundColor: _hoveredBgColor,
        zIndex: 1
      },

      _selected: Object.assign({
        color: _selectedFontColor,
        borderColor: _selectedBorder,
        backgroundColor: _selectedBg,
        zIndex: 2
      }, statusProps._selected),

      _focusSelected: {
        borderColor: _focusBorderColor,
        zIndex: 3
      },

      _disabled: Object.assign(statusProps._disabled, {
        color: _disabledColor,
        backgroundColor,
        borderColor
      })
    },
    // tabList: {
    //   mb: '-1px',
    //   borderBottom: '1px',
    //   borderColor: 'inherit',
    // },
  };
};

const enclosedColoredStyle = ({ color, colorMode }) => {
  const bg = {
    light: 'gray:50',
    dark: 'white.tertiary'
  };
  const _selectedColor = {
    light: `${color}:60`,
    dark: `${color}:30`
  };
  const _selectedBg = {
    light: '#fff',
    dark: 'gray:80'
  };

  return {
    tab: {
      border: '1px',
      borderColor: 'inherit',
      bg: bg[colorMode],
      mb: '-1px',
      _notLast: {
        mr: '-1px',
      },
      _selected: {
        bg: _selectedBg[colorMode],
        color: _selectedColor[colorMode],
        borderColor: 'inherit',
        borderTopColor: 'currentColor',
        borderBottomColor: 'transparent',
      },
    },
    tabList: {
      mb: '-1px',
      borderBottom: '1px',
      borderColor: 'inherit',
    },
  };
};

const softRoundedStyle = ({ color, size, theme }) => {
  return {
    tab: {
      borderRadius: theme.space[tabSizes[size].height],
      _selected: {
        color: `${color}:70`,
        bg: `${color}:100`,
      },
    },
    tabList: {},
  };
};

const solidRoundedStyle = ({ color, colorMode }) => {
  const _color = {
    light: 'gray:60',
    dark: 'inherit'
  };
  const _selectedBg = {
    light: `${color}:60`,
    dark: `${color}:30`
  };
  const _selectedColor = {
    light: '#fff',
    dark: 'gray:80'
  };

  return {
    tab: {
      rounded: 'full',
      fontWeight: 'semibold',
      color: _color[colorMode],
      _selected: {
        color: _selectedColor[colorMode],
        bg: _selectedBg[colorMode],
      },
    },
    tabList: {},
  };
};

export const variantStyle = props => {
  switch (props.variant) {
  case 'line':
    return lineStyle(props);
  case 'enclosed':
    return enclosedStyle(props);
  case 'enclosed-colored':
    return enclosedColoredStyle(props);
  case 'soft-rounded':
    return softRoundedStyle(props);
  case 'solid-rounded':
    return solidRoundedStyle(props);
  default:
    return {};
  }
};

// TO DO: Add support for vertical orientation
export const orientationStyle = ({ align, orientation }) => {
  const alignments = {
    right: 'flex-end',
    center: 'center',
    left: 'flex-start',
  };

  let tabListStyle;
  let tabStyle;

  if (orientation === 'horizontal') {
    tabListStyle = {
      alignItems: 'center',
      justifyContent: alignments[align],
      maxWidth: 'full',
    };

    tabStyle = {
      height: '100%',
    };
  }

  if (orientation === 'vertical') {
    tabListStyle = { flexDirection: 'column' };

    tabStyle = {
      width: '100%',
    };
  }

  return {
    tabList: tabListStyle,
    tab: tabStyle,
  };
};

export const useTabStyle = () => {
  const theme = useTheme();
  const { variant, color, size, isFitted, orientation } = useContext(
    TabContext,
  );
  const { colorMode } = useColorMode();
  const _variantStyle = variantStyle({ size, variant, color, theme, colorMode });
  const _orientationStyle = orientationStyle({ orientation });

  return {
    ...baseProps.tab,
    ...statusProps,
    ...(tabSizes[size] ? tabSizes[size] : tabSizes.md),
    ...(_variantStyle && _variantStyle.tab),
    ...(_orientationStyle && _orientationStyle.tab),
    ...(isFitted && { flex: 1 }),
  };
};

export const useTabListStyle = () => {
  const theme = useTheme();
  const { size, variant, align, orientation } = useContext(TabContext);
  const _variantStyle = variantStyle({ size, variant, theme });
  const _orientationStyle = orientationStyle({ align, orientation });

  return {
    ...baseProps.tabList,
    ...(_variantStyle && _variantStyle.tabList),
    ...(_orientationStyle && _orientationStyle.tabList),
  };
};
