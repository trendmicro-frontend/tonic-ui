import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const solidStyle = ({ color, canFocus, theme: { colors } }) => {
  const solidColors = {
    gray: {
      bg: 'gray:70',
      color: 'gray:20'
    },
    red: {
      bg: 'red:80',
      color: 'red:20'
    },
    magenta: {
      bg: 'magenta:80',
      color: 'magenta:20'
    },
    purple: {
      bg: 'purple:80',
      color: 'purple:20'
    },
    blue: {
      bg: 'blue:80',
      color: 'blue:20'
    },
    green: {
      bg: 'green:70',
      color: 'green:20'
    },
    teal: {
      bg: 'teal:70',
      color: 'teal:20'
    },
    cyan: {
      bg: 'cyan:70',
      color: 'cyan:20'
    },
  };
  const colorStyle = solidColors[color] || {
    bg: `${color}:80`,
    color: `${color}:20`,
  };
  const focusColor = colors['blue:60'];
  const styles = {
    ...colorStyle,
    ...(canFocus) && {
      _focus: {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
        bg: 'inherit',
        zIndex: 1,
        '&::before': {
          top: '2px',
          bottom: '2px',
          left: '2px',
          right: '2px',
          bg: colorStyle.bg
        },
      },
    },
    _invalid: {
      bg: 'red:60',
      color: 'white:emphasis',
      ...(canFocus) && {
        '&:focus': {
          borderColor: focusColor,
          boxShadow: `inset 0 0 0 1px ${focusColor}`,
          bg: 'inherit',
          '&::before': {
            top: '2px',
            bottom: '2px',
            left: '2px',
            right: '2px',
            bg: 'red:60'
          },
        },
      },
    },
    _disabled: {
      borderColor: 'transparent', // override focus style
      boxShadow: 'none', // override focus style
      bg: 'gray:70',
      '&::before': {
        bg: 'inherit',
      },
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };
  return styles;
};

const outlineStyle = ({ color, colorMode, canFocus, theme: { colors } }) => {
  const outlineColors = {
    gray: {
      borderColor: 'gray:50',
      color: 'gray:40'
    },
  };
  const colorStyle = outlineColors[color] || {
    borderColor: `${color}:50`,
    color: `${color}:50`,
  };
  const isDarkMode = (colorMode === 'dark');
  const focusColor = colors['blue:60'];
  const styles = {
    ...colorStyle,
    ...(canFocus) && {
      _focus: {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
        zIndex: 1,
      },
    },
    _invalid: {
      borderColor: 'transparent',
      bg: 'red:60',
      color: 'white:emphasis',
      ...(canFocus) && {
        '&:focus': {
          borderColor: focusColor,
          boxShadow: `inset 0 0 0 1px ${focusColor}`,
          bg: 'inherit',
          '&::before': {
            top: '2px',
            bottom: '2px',
            left: '2px',
            right: '2px',
            bg: 'red:60'
          },
        },
      },
    },
    _disabled: {
      borderColor: 'gray:70',
      boxShadow: 'none',
      color: isDarkMode ? 'white:emphasis' : 'black',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

const variantProps = props => {
  const variant = props.variant;

  switch (variant) {
  case 'solid':
    return solidStyle(props);
  case 'outline':
    return outlineStyle(props);
  default:
    return {};
  }
};

////////////////////////////////////////////////////////////

const labelSizes = {
  sm: {
    fontSize: 'xs',
    lineHeight: 1,
    minHeight: '4x',
  },
  md: {
    fontSize: 'xs',
    lineHeight: 'xs',
    minHeight: '6x',
    py: 2
  },
  lg: {
    fontSize: 'md',
    lineHeight: 'md',
    minHeight: '8x',
    py: '1x'
  },
};

const closeButtonSizes = {
  sm: '4x',
  md: '6x',
  lg: '8x',
};

const sizeProps = ({ size, isCloseButtonVisible, theme: { sizes } }) => {
  const space = sizes['1x'];
  const closeButtonSize = sizes[closeButtonSizes[size]];
  const pr = isCloseButtonVisible
    ? `calc(${space} + ${closeButtonSize})`
    : '2x';
  return {
    ...labelSizes[size],
    pl: '2x',
    pr: pr,
  };
};

////////////////////////////////////////////////////////////

const baseProps = {
  alignItems: 'center',
  verticalAlign: 'top',
  border: 1,
  borderColor: 'transparent',
  cursor: 'default',
  display: 'inline-flex',
  position: 'relative',
  outline: 'none',
};

const useTagStyle = ({ borderRadius, ...props }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };
  return {
    ...baseProps,
    __before: {
      content: '""',
      display: 'inline-block',
      borderRadius: borderRadius,
      zIndex: -1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    ...sizeProps(_props),
    ...variantProps(_props),
  };
};

////////////////////////////////////////////////////////////

const useTagCloseButtonStyle = ({ size }) => {
  const color = setColorWithOpacity('white', 0.6);
  const hoverColor = 'white';
  const activeColor = color;
  const _size = closeButtonSizes[size];

  return {
    position: 'absolute',
    right: 0,
    color: color,
    height: _size,
    width: _size,
    minWidth: _size, // ensure a minimum width for the close button
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _disabled: {
      color: 'white',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
