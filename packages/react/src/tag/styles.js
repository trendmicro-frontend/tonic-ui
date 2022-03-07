import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const baseStyle = {
  alignItems: 'center',
  border: 1,
  borderColor: 'transparent',
  borderRadius: 'sm',
  cursor: 'default',
  display: 'inline-flex',
  outline: 'none',
  pl: '2x',
  pr: '2x',
};

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
    py: '1h',
  },
  lg: {
    fontSize: 'md',
    lineHeight: 'md',
    minHeight: '8x',
    py: '1x',
  },
};

const getSizeProps = ({
  size,
}) => {
  return {
    ...labelSizes[size],
  };
};

//---------------- Basic Tag ----------------//
const getSolidTagStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:70',
    light: 'gray:20',
  }[colorMode];
  const color = {
    dark: 'gray:20',
    light: 'black:emphasis',
  }[colorMode];

  return {
    backgroundColor,
    color,
  };
};

const getOutlineTagStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];
  const color = {
    dark: 'gray:40',
    light: 'gray:60',
  }[colorMode];

  return {
    borderColor,
    color,
  };
};

const useTagStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const variantStyle = {
    'solid': getSolidTagStyle({ colorMode }),
    'outline': getOutlineTagStyle({ colorMode }),
  }[variant];
  const sizeProps = getSizeProps({ size });

  return {
    ...baseStyle,
    ...sizeProps,
    ...variantStyle,
  };
};

//---------------- Editable Tag ----------------//
const getSolidEditableTagStyle = ({
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

  return {
    backgroundColor,
    color,
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
};

const getOutlineEditableTagStyle = ({
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

  return {
    borderColor,
    color,
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
};

const useEditableTagStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const variantStyle = {
    'solid': getSolidEditableTagStyle({
      colorMode,
      theme,
    }),
    'outline': getOutlineEditableTagStyle({
      colorMode,
      theme,
    }),
  }[variant];
  const sizeProps = getSizeProps({
    size,
  });

  return {
    ...baseStyle,
    cursor: 'pointer', // override base style
    ...sizeProps,
    ...variantStyle,
  };
};

const useTagCloseButtonStyle = () => {
  const [colorMode] = useColorMode();
  const size = '4x';

  // Normal
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  // Hover
  const hoverColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  // Active
  const activeColor = color;
  // Focus
  const focusColor = hoverColor;
  // Disable
  const disabledColor = color;

  return {
    backgroundColor: 'transparent',
    color: color,
    height: size,
    width: size,
    minWidth: size, // ensure a minimum width for the close button
    _hover: {
      color: hoverColor,
    },
    _focus: {
      color: focusColor,
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
  useEditableTagStyle,
  useTagStyle,
  useTagCloseButtonStyle,
};
