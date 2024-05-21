import { useColorMode } from '../color-mode';
import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const getSolidTagStyle = ({
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
    'solid': getSolidTagStyle({ colorMode, theme }),
    'outline': getOutlineTagStyle({ colorMode, theme }),
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
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const size = '4x';
  const iconButtonStyle = useIconButtonStyle({ color, size });

  if (isClosable) {
    return {
      ...iconButtonStyle,
      _hover: {
        color: hoverColor,
      },
      _focusVisible: {
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: '-1q',
        outlineStyle: 'solid',
        outlineWidth: '1q',
      },
      ml: '2x',
    };
  }

  return {
    ...iconButtonStyle,
    _hover: {
      color: hoverColor,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1q',
      outlineStyle: 'solid',
      outlineWidth: '1q',
    },
  };
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
