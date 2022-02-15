import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

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
    py: 2,
  },
  lg: {
    fontSize: 'md',
    lineHeight: 'md',
    minHeight: '8x',
    py: '1x',
  },
};

const closeButtonSizes = {
  sm: '4x',
  md: '6x',
  lg: '8x',
};

const getSolidTagStyle = ({
  canFocus,
  colorMode,
  theme,
}) => {
  // Normal
  const backgroundColor = {
    dark: 'gray:70',
    light: 'gray:20',
  }[colorMode];
  const color = {
    dark: 'gray:20',
    light: 'black:emphasis',
  }[colorMode];
  // Hover
  const hoverBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:10',
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
  const hoverInvalidBackgroundColor = {
    dark: 'red:50',
    light: 'red:10',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  const tagStateStyle = {
    _focus: {
      '&:not([disabled])': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
    },
    _hover: {
      '&:not([disabled])': {
        backgroundColor: hoverBackgroundColor,
      },
    },
    _invalid: {
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
      '&:not([disabled]):hover': {
        backgroundColor: hoverInvalidBackgroundColor,
        color: invalidColor,
      },
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };

  return {
    backgroundColor,
    color,
    ...(canFocus && tagStateStyle),
  };
};

const getOutlineTagStyle = ({
  canFocus,
  colorMode,
  theme,
}) => {
  // Normal
  const borderColor = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];
  const color = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];
  // Hover
  const hoverBorderColor = {
    dark: 'gray:30',
    light: 'gray:50',
  }[colorMode];
  const hoverColor = {
    dark: 'gray:30',
    light: 'gray:50',
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
  const hoverInvalidBackgroundColor = {
    dark: 'red:50',
    light: 'red:10',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  const tagStateStyle = {
    _focus: {
      '&:not([disabled])': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
    },
    _hover: {
      '&:not([disabled])': {
        borderColor: hoverBorderColor,
        color: hoverColor,
      },
    },
    _focusHover: {
      '&:not([disabled])': {
        borderColor: focusColor,
        color: hoverColor,
      },
    },
    _invalid: {
      borderColor: invalidBackgroundColor,
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
      '&:not([disabled]):hover': {
        borderColor: hoverInvalidBackgroundColor,
        backgroundColor: hoverInvalidBackgroundColor,
        color: invalidColor,
      },
      '&:not([disabled]):focus:hover': {
        color: invalidColor,
      },
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };

  return {
    borderColor,
    color,
    ...(canFocus && tagStateStyle),
  };
};

const getSizeProps = ({
  isClosable,
  size,
  theme,
}) => {
  const space = theme?.sizes?.['1x'];
  const closeButtonSize = theme?.sizes?.[closeButtonSizes[size]];
  return {
    ...labelSizes[size],
    pl: '2x',
    pr: isClosable ? `calc(${space} + ${closeButtonSize})` : '2x',
  };
};

const useTagStyle = ({
  canFocus,
  isClosable,
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const baseStyle = {
    alignItems: 'center',
    border: 1,
    borderColor: 'transparent',
    cursor: 'default',
    display: 'inline-flex',
    position: 'relative',
    outline: 'none',
  };
  const variantStyle = {
    'solid': getSolidTagStyle({
      canFocus,
      colorMode,
      theme,
    }),
    'outline': getOutlineTagStyle({
      canFocus,
      colorMode,
      theme,
    }),
  }[variant];
  const sizeProps = getSizeProps({
    isClosable,
    size,
    theme
  });

  return {
    ...baseStyle,
    ...sizeProps,
    ...variantStyle,
  };
};

const useTagCloseButtonStyle = ({
  size,
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
  const disabledColor = color;
  const _size = closeButtonSizes[size];

  return {
    backgroundColor: 'transparent',
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
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
