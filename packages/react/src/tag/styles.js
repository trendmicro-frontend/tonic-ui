import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { setColorWithOpacity } from '../utils/colors';

const solidStyle = ({ color, colorMode, canFocus, theme: { colors } }) => {
  const undefinedColor = {
    dark: {
      bg: `${color}:80`,
      color: `${color}:20`,
    },
    light: {
      bg: `${color}:80`,
      color: `${color}:20`,
    }
  }[colorMode];
  const solidColors = {
    dark: {
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
    },
    light: {
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
    }
  }[colorMode];

  const baseColors = solidColors[color] || undefinedColor;

  const focusColor = {
    dark: colors['blue:60'],
    light: colors['blue:60'],
  }[colorMode];
  const disabledBgColor = {
    dark: 'gray:70',
    light: 'gray:70',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  const invalidBgColor = {
    dark: 'red:60',
    light: 'red:60',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
  }[colorMode];

  const styles = {
    ...baseColors,
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
          bg: baseColors.bg
        },
      },
    },
    _invalid: {
      bg: invalidBgColor,
      color: invalidColor,
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
            bg: invalidBgColor
          },
        },
      },
    },
    _disabled: {
      borderColor: 'transparent', // override focus style
      boxShadow: 'none', // override focus style
      bg: disabledBgColor,
      '&::before': {
        bg: 'inherit',
      },
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
  return styles;
};

const outlineStyle = ({ color, colorMode, canFocus, theme: { colors } }) => {
  const undefinedColor = {
    dark: {
      borderColor: `${color}:50`,
      color: `${color}:50`,
    },
    light: {
      borderColor: `${color}:50`,
      color: `${color}:50`,
    }
  }[colorMode];
  const outlineColors = {
    dark: {
      gray: {
        borderColor: 'gray:50',
        color: 'gray:40'
      },
    },
    light: {
      gray: {
        borderColor: 'gray:50',
        color: 'gray:40'
      },
    }
  }[colorMode];

  const baseColors = outlineColors[color] || undefinedColor;

  const focusColor = {
    dark: colors['blue:60'],
    light: colors['blue:60'],
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:70',
    light: 'gray:70',
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  const invalidBgColor = {
    dark: 'red:60',
    light: 'red:60',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
  }[colorMode];

  const styles = {
    ...baseColors,
    ...(canFocus) && {
      _focus: {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
        zIndex: 1,
      },
    },
    _invalid: {
      borderColor: 'transparent',
      bg: invalidBgColor,
      color: invalidColor,
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
            bg: invalidBgColor
          },
        },
      },
    },
    _disabled: {
      borderColor: disabledBorderColor,
      boxShadow: 'none',
      color: disabledColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
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

const sizeProps = ({ size, isClosable, theme: { sizes } }) => {
  const space = sizes['1x'];
  const closeButtonSize = sizes[closeButtonSizes[size]];
  const pr = isClosable
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
  border: 1,
  borderColor: 'transparent',
  cursor: 'default',
  display: 'inline-flex',
  position: 'relative',
  outline: 'none',
};

const useTagStyle = ({ borderRadius, ...props }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
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
