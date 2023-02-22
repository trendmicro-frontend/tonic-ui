import { createTransitionStyle } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const getSolidTagStyle = ({
  color: colorProp, // deprecated
  colorMode,
  theme,
}) => {
  const undefinedColor = {
    dark: {
      backgroundColor: `${colorProp}:80`,
      color: `${colorProp}:20`,
    },
    light: {
      backgroundColor: `${colorProp}:80`,
      color: `${colorProp}:20`,
    }
  }[colorMode];
  const solidColors = {
    dark: {
      gray: {
        backgroundColor: 'gray:70',
        color: 'gray:20'
      },
      red: {
        backgroundColor: 'red:80',
        color: 'red:20'
      },
      magenta: {
        backgroundColor: 'magenta:80',
        color: 'magenta:20'
      },
      purple: {
        backgroundColor: 'purple:80',
        color: 'purple:20'
      },
      blue: {
        backgroundColor: 'blue:80',
        color: 'blue:20'
      },
      green: {
        backgroundColor: 'green:70',
        color: 'green:20'
      },
      teal: {
        backgroundColor: 'teal:70',
        color: 'teal:20'
      },
      cyan: {
        backgroundColor: 'cyan:70',
        color: 'cyan:20'
      },
    },
    light: {
      gray: {
        backgroundColor: 'gray:70',
        color: 'gray:20'
      },
      red: {
        backgroundColor: 'red:80',
        color: 'red:20'
      },
      magenta: {
        backgroundColor: 'magenta:80',
        color: 'magenta:20'
      },
      purple: {
        backgroundColor: 'purple:80',
        color: 'purple:20'
      },
      blue: {
        backgroundColor: 'blue:80',
        color: 'blue:20'
      },
      green: {
        backgroundColor: 'green:70',
        color: 'green:20'
      },
      teal: {
        backgroundColor: 'teal:70',
        color: 'teal:20'
      },
      cyan: {
        backgroundColor: 'cyan:70',
        color: 'cyan:20'
      },
    }
  }[colorMode];

  const baseColors = solidColors[colorProp] || undefinedColor;

  // Normal
  const backgroundColor = {
    dark: 'gray:70',
    light: 'gray:20',
  }[colorMode];
  const color = {
    dark: 'gray:20',
    light: 'black:emphasis',
  }[colorMode];
  // Focus
  const focusColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = {
    dark: theme?.colors?.['black:emphasis'],
    light: theme?.colors?.['white:emphasis'],
  }[colorMode];
  const boxShadowSpreadRadius = theme?.sizes?.['2q'];
  // Disable
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  // Invalid
  const invalidBackgroundColor = {
    dark: 'red:60',
    light: 'red:20',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  return {
    backgroundColor,
    color,
    ...(colorProp && baseColors),
    _focus: {
      '&:not([disabled])': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
    },
    _invalid: {
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
};

const getOutlineTagStyle = ({
  color: colorProp, // deprecated
  colorMode,
  theme,
}) => {
  const undefinedColor = {
    dark: {
      borderColor: `${colorProp}:50`,
      color: `${colorProp}:50`,
    },
    light: {
      borderColor: `${colorProp}:50`,
      color: `${colorProp}:50`,
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

  const baseColors = outlineColors[colorProp] || undefinedColor;

  // Normal
  const borderColor = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];
  const color = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];
  // Focus
  const focusColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = {
    dark: theme?.colors?.['black:emphasis'],
    light: theme?.colors?.['white:emphasis'],
  }[colorMode];
  const boxShadowSpreadRadius = theme?.sizes?.['2q'];
  // Disable
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  // Invalid
  const invalidBackgroundColor = {
    dark: 'red:60',
    light: 'red:20',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  return {
    borderColor,
    color,
    ...(colorProp && baseColors),
    _focus: {
      '&:not([disabled])': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
    },
    _invalid: {
      borderColor: invalidBackgroundColor,
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
};

const useTagStyle = ({
  color, // deprecated
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const { sizes } = theme;
  const borderWidth = sizes['1q'];
  const px = `calc(${sizes['2x']} - ${borderWidth})`;
  const baseStyle = {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 'sm',
    borderStyle: 'solid',
    borderWidth,
    display: 'inline-flex',
    position: 'relative',
    px,
  };
  const sizeStyle = {
    sm: {
      fontSize: 'xs',
      lineHeight: 1,
      minHeight: '4x',
    },
    md: {
      fontSize: 'xs',
      lineHeight: 'xs',
      minHeight: '6x',
      py: `calc(${sizes['1h']} - ${borderWidth})`,
    },
    lg: {
      fontSize: 'md',
      lineHeight: 'md',
      minHeight: '8x',
      py: `calc(${sizes['1x']} - ${borderWidth})`,
    },
  }[size];
  const variantStyle = {
    'solid': getSolidTagStyle({ color, colorMode, theme }),
    'outline': getOutlineTagStyle({ color, colorMode, theme }),
  }[variant];

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useTagCloseButtonStyle = ({
  isClosable,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const activeColor = color;
  const focusColor = hoverColor;
  const disabledColor = color;
  const focusOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const size = '4x';
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    height: size,
    width: size,
    transition: createTransitionStyle(['color'], { duration: 200 }),
    _hover: {
      color: hoverColor,
    },
    _focus: {
      color: focusColor,
      outline: 1,
      outlineColor: focusOutlineColor,
    },
    _active: {
      color: activeColor,
    },
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };

  if (isClosable) {
    return {
      ...baseStyle,
      ml: '2x',
    };
  }

  return baseStyle;
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
