import { sx } from '@tonic-ui/styled-system';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { setColorWithOpacity } from '../utils/colors';
import { createTransitionStyle, transitionEasing } from '../utils/transitions';

//---------------- Default Button ----------------//
const defaultVariantProps = ({
  colorMode,
  theme,
}) => {
  // Normal
  const backgroundColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  const color = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  // Hover
  const hoverBackgroundColor = {
    dark: 'gray:50',
    light: 'gray:10',
  }[colorMode];
  // Active
  const activeBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  // Focus
  const focusBorderColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = {
    dark: theme?.colors?.['black:emphasis'],
    light: theme?.colors?.['white:emphasis'],
  }[colorMode];
  const boxShadowSpreadRadius = theme?.sizes?.['2q'];
  // Disabled
  const disabledBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];

  return {
    backgroundColor,
    borderColor: 'transparent',
    color,
    _focus: {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusBorderColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      backgroundColor: activeBackgroundColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
};

//---------------- Secondary Button ----------------//
const secondaryVariantProps = ({
  colorMode,
  theme,
}) => {
  // Normal
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  // Hover
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const hoverColor = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  // Active
  const activeBackgroundColor = {
    dark: setColorWithOpacity('black', 0.12),
    light: setColorWithOpacity('black', 0.08),
  }[colorMode];
  const activeBorderColor = hoverBorderColor;
  const activeColor = hoverColor;
  // Focus
  const focusBorderColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const focusColor = color;
  // Disabled
  const disabledBorderColor = borderColor;
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];

  return {
    borderColor,
    color,
    _focus: {
      color: focusColor,
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusBorderColor}`,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      color: hoverColor,
      '&:not(:focus)': {
        borderColor: hoverBorderColor,
      },
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      color: activeColor,
      borderColor: activeBorderColor,
      backgroundColor: activeBackgroundColor,
    },
    _disabled: {
      color: disabledColor,
      borderColor: disabledBorderColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
};

//---------------- Ghost Button ----------------//
const ghostVariantProps = ({
  colorMode,
  theme,
}) => {
  const secondaryProps = secondaryVariantProps({
    colorMode,
    theme,
  });
  return {
    ...secondaryProps,
    borderColor: 'transparent',
    _disabled: {
      ...secondaryProps._disabled,
      borderColor: 'transparent',
    },
  };
};

//---------------- Emphasis / Primary Button ----------------//
const fillColorVariantProps = ({
  color,
  colorMode,
  theme,
}) => {
  // Normal
  const backgroundColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  // Hover
  const hoverBackgroundColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  // Active
  const activeBackgroundColor = {
    dark: `${color}:70`,
    light: `${color}:70`,
  }[colorMode];
  // Focus
  const focusBorderColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = {
    dark: theme?.colors?.['black:emphasis'],
    light: theme?.colors?.['white:emphasis'],
  }[colorMode];
  const boxShadowSpreadRadius = theme?.sizes?.['2q'];
  // Disabled
  const disabledBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];

  return {
    backgroundColor,
    borderColor: 'transparent',
    color: 'white:emphasis',
    _focus: {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusBorderColor}, inset 0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`,
      },
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      backgroundColor: activeBackgroundColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
  };
};

const useButtonStyle = ({ size, variant }) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const borderWidth = theme?.sizes?.['1q'];
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    border: 1,
    //zIndex: 0,
    px: `calc(${theme?.sizes?.['3x']} - ${borderWidth})`,
    transition: createTransitionStyle(['background-color', 'border-color', 'box-shadow', 'color'], {
      duration: 250,
      easing: transitionEasing.easeInOut,
    }),
  };
  const sizeProps = {
    lg: {
      minHeight: '10x',
      fontSize: 'md',
      lineHeight: 'md',
    },
    md: {
      minHeight: '8x',
      fontSize: 'sm',
      lineHeight: 'sm',
    },
    sm: {
      minHeight: '6x',
      fontSize: 'sm',
      lineHeight: 'sm',
    },
  }[size];
  const variantStyle = {
    'secondary': secondaryVariantProps({ colorMode, theme }),
    'ghost': ghostVariantProps({ colorMode, theme }),
    'emphasis': fillColorVariantProps({ color: 'red', colorMode, theme }),
    'primary': fillColorVariantProps({ color: 'blue', colorMode, theme }),
    'default': defaultVariantProps({ colorMode, theme }),
  }[variant];

  return {
    ...baseStyle,
    ...sizeProps,
    ...variantStyle,
  };
};

const useButtonBaseStyle = ({ disabled }) => {
  return {
    appearance: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    cursor: !!disabled ? 'default' : 'pointer',
    lineHeight: 1,
    outline: 0,
    padding: 0,
  };
};

const getButtonGroupCSS = ({ orientation }) => {
  const horizontalCSS = sx({
    '&:not(:first-of-type)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  });
  const verticalCSS = sx({
    '&:not(:first-of-type)': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  });
  return (orientation === 'vertical') ? verticalCSS : horizontalCSS;
};

export {
  getButtonGroupCSS,
  useButtonStyle,
  useButtonBaseStyle,
};
