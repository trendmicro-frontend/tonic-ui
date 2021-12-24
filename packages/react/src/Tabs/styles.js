import { useContext } from 'react';
import { useColorMode } from '../ColorMode';
import { useTheme } from '../Theme';
import { setColorWithOpacity } from '../utils/colors';
import { TabContext } from './context';

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

const tabProps = {
  display: 'flex',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: '2px',
  alignItems: 'center',
  justifyContent: 'center',
};

const tabList = {
  borderWidth: 0,
  borderBottomWidth: tabProps.borderWidth,
  borderColor: 'transparent',
  borderStyle: 'solid'
};

const lineStyle = ({ size, colorMode, theme }) => {
  const _color = { light: theme.colors['black:primary'], dark: theme.colors['white:emphasis'] }[colorMode];
  const _fontColor = setColorWithOpacity(_color, 0.6);
  const _hoveredBorderColor = 'gray:60';
  const _focusBorderColor = 'blue:60';
  const _selectedBorderColor = 'red:60';
  const _selectedFontColor = _color;
  const _disabledBorderColor = 'transparent';
  const _disabledColor = setColorWithOpacity(_color, 0.28);

  return {
    tabList: {
      borderBottomWidth: tabList.borderBottomWidth,
      borderColor: 'transparent',
    },
    tab: {
      color: _fontColor,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      mb: `-${tabProps.borderWidth}`,
      _hover: {
        borderBottomColor: _hoveredBorderColor,
      },
      _selected: {
        borderBottomColor: _selectedBorderColor,
        color: _selectedFontColor,
        cursor: 'default',
      },
      _focus: {
        borderBottomColor: _focusBorderColor,
        zIndex: 3,
      },
      _disabled: {
        borderBottomColor: _disabledBorderColor,
        color: _disabledColor,
        cursor: 'not-allowed',
      },
      _focusSelected: {
        borderBottomColor: _selectedBorderColor
      },
      _focusActive: {
        borderBottomColor: _hoveredBorderColor,
      },
    },
  };
};

const enclosedStyle = ({ size, colorMode, theme }) => {
  const _borderWidth = '1px';
  const _focusBorderWidth = '2px';
  const _px = tabSizes[size] ? theme.space[tabSizes[size].px] : theme.space[tabSizes.md.px];
  const _lineHeight = tabSizes[size] ? theme.lineHeights[tabSizes[size].lineHeight] : theme.lineHeights[tabSizes.md.lineHeight];
  const _color = { light: theme.colors['black:primary'], dark: theme.colors['white:emphasis'] }[colorMode];
  const _backgroundColor = { light: 'gray:20', dark: 'gray:90' }[colorMode];
  const _borderColor = { light: 'gray:30', dark: 'gray:80' }[colorMode];
  const _hoveredBorderColor = { light: 'gray:30', dark: 'gray:70' }[colorMode];
  const _hoveredBgColor = { light: 'gray:10', dark: 'gray:70' }[colorMode];
  const _focusBorderColor = { light: 'blue:60', dark: 'blue:60' }[colorMode];
  const _selectedBg = { light: 'white:emphasis', dark: 'gray:80' }[colorMode];
  const _selectedBorder = { light: 'gray:30', dark: 'gray:80' }[colorMode];
  const _fontColor = setColorWithOpacity(_color, 0.6);
  const _selectedFontColor = _color;
  const _disabledBackgroundColor = _backgroundColor;
  const _disabledBorderColor = _borderColor;
  const _disabledColor = setColorWithOpacity(_color, 0.28);

  return {
    tab: {
      color: _fontColor,
      borderWidth: _borderWidth,
      borderColor: _borderColor,
      backgroundColor: _backgroundColor,
      px: `calc(${_px} - ${_borderWidth})`,
      py: `calc((${theme.space[tabSizes[size].height]} - ${_lineHeight} - (${_borderWidth} * 2)) / 2)`,
      mr: '-1px',
      mb: '-1px',
      _selected: {
        backgroundColor: _selectedBg,
        borderColor: _selectedBorder,
        color: _selectedFontColor,
        cursor: 'default',
        zIndex: 1
      },
      _hover: {
        borderColor: _hoveredBorderColor,
        backgroundColor: _hoveredBgColor,
        zIndex: 2
      },
      _focus: {
        borderColor: _focusBorderColor,
        borderWidth: _focusBorderWidth,
        px: `calc(${_px} - ${_focusBorderWidth})`,
        py: `calc((${theme.space[tabSizes[size].height]} - ${_lineHeight} - (${_focusBorderWidth} * 2)) / 2)`,
        zIndex: 3,
      },
      _focusHover: {
        borderColor: _focusBorderColor,
        zIndex: 3
      },
      _focusSelected: {
        borderColor: _selectedBorder,
        zIndex: 3
      },
      _focusActive: {
        borderColor: _hoveredBorderColor,
      },
      _disabled: {
        backgroundColor: _disabledBackgroundColor,
        borderColor: _disabledBorderColor,
        color: _disabledColor,
        cursor: 'not-allowed',
      }
    }
  };
};

const variantStyle = props => {
  switch (props.variant) {
  case 'line':
    return lineStyle(props);
  case 'enclosed':
    return enclosedStyle(props);
  default:
    return {};
  }
};

const orientationStyle = ({ align, orientation }) => {
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
  const { variant, size, isFitted, orientation } = useContext(
    TabContext,
  );
  const [colorMode] = useColorMode();
  const _variantStyle = variantStyle({ size, variant, theme, colorMode });
  const _orientationStyle = orientationStyle({ orientation });

  return {
    ...tabProps,
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
    ...tabList,
    ...(_variantStyle && _variantStyle.tabList),
    ...(_orientationStyle && _orientationStyle.tabList),
  };
};
