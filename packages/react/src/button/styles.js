import { createTransitionStyle, transitionEasing } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

//---------------- Default Button ----------------//
const defaultVariantStyle = ({
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
    light: 'black:emphasis',
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
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const focusBoxShadowOuterColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowOuterSpreadRadius = theme?.sizes?.['1q'];
  const focusBoxShadowInnerColor = {
    dark: theme?.colors?.['black:emphasis'],
    light: theme?.colors?.['white:emphasis'],
  }[colorMode];
  const focusBoxShadowInnerSpreadRadius = theme?.sizes?.['2q'];
  // Disabled
  const disabledBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  // Selected
  const selectedBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const selectedColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];

  return {
    backgroundColor,
    borderColor: 'transparent',
    color,
    _focus: {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 ${focusBoxShadowOuterSpreadRadius} ${focusBoxShadowOuterColor}, inset 0 0 0 ${focusBoxShadowInnerSpreadRadius} ${focusBoxShadowInnerColor}`,
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
    _selected: {
      backgroundColor: selectedBackgroundColor,
      color: selectedColor,
      pointerEvents: 'none', // Do not react to mouse events when selected
    },
  };
};

//---------------- Secondary Button ----------------//
const secondaryVariantStyle = ({
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
    dark: 'rgba(0, 0, 0, 0.12)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];
  const activeBorderColor = hoverBorderColor;
  const activeColor = hoverColor;
  // Focus
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const focusBoxShadowColor = {
    dark: theme?.colors?.['blue:60'],
    light: theme?.colors?.['blue:60'],
  }[colorMode];
  const focusBoxShadowSpreadRadius = theme?.sizes?.['1q'];
  const focusColor = color;
  // Disabled
  const disabledBorderColor = borderColor;
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  // Selected
  const selectedBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const selectedColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];

  return {
    borderColor,
    color,
    _focus: {
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 ${focusBoxShadowSpreadRadius} ${focusBoxShadowColor}`,
      color: focusColor,
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
      borderColor: activeBorderColor,
      backgroundColor: activeBackgroundColor,
      color: activeColor,
    },
    _disabled: {
      borderColor: disabledBorderColor,
      color: disabledColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
    _selected: {
      backgroundColor: selectedBackgroundColor,
      color: selectedColor,
      pointerEvents: 'none', // Do not react to mouse events when selected
    },
  };
};

//---------------- Ghost Button ----------------//
const ghostVariantStyle = ({
  colorMode,
  theme,
}) => {
  const style = secondaryVariantStyle({
    colorMode,
    theme,
  });
  // Selected
  const selectedBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const selectedBorderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const selectedColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];

  return {
    ...style,
    borderColor: 'transparent',
    _disabled: {
      ...style._disabled,
      borderColor: 'transparent',
      cursor: 'not-allowed',
    },
    _selected: {
      backgroundColor: selectedBackgroundColor,
      borderColor: selectedBorderColor,
      color: selectedColor,
      pointerEvents: 'none', // Do not react to mouse events when selected
    },
  };
};

//---------------- Emphasis / Primary Button ----------------//
const fillColorVariantStyle = ({
  color: colorProp,
  colorMode,
  theme,
}) => {
  // Normal
  const backgroundColor = {
    dark: `${colorProp}:60`,
    light: `${colorProp}:60`,
  }[colorMode];
  const color = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
  }[colorMode];
  // Hover
  const hoverBackgroundColor = {
    dark: `${colorProp}:50`,
    light: `${colorProp}:50`,
  }[colorMode];
  // Active
  const activeBackgroundColor = {
    dark: `${colorProp}:70`,
    light: `${colorProp}:70`,
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
    light: 'black:emphasis',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];
  // Selected
  const selectedBackgroundColor = {
    dark: `${colorProp}:80`,
    light: `${colorProp}:80`,
  }[colorMode];
  const selectedColor = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
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
    _selected: {
      backgroundColor: selectedBackgroundColor,
      color: selectedColor,
      pointerEvents: 'none', // Do not react to mouse events when selected
    },
  };
};

const useButtonStyle = ({
  orientation, // No default value if not specified
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    border: 1,
    borderRadius: 'sm',
    px: '3x',
    transition: createTransitionStyle(['background-color', 'border-color', 'box-shadow', 'color'], {
      duration: 250,
      easing: transitionEasing.easeInOut,
    }),
  };
  const orientationStyle = {
    'horizontal': {
      _notFirstOfType: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      _notLastOfType: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    'vertical': {
      _notFirstOfType: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
      _notLastOfType: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  }[orientation];
  const sizeStyle = {
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
    'secondary': secondaryVariantStyle({ colorMode, theme }),
    'ghost': ghostVariantStyle({ colorMode, theme }),
    'emphasis': fillColorVariantStyle({ color: 'red', colorMode, theme }),
    'primary': fillColorVariantStyle({ color: 'blue', colorMode, theme }),
    'default': defaultVariantStyle({ colorMode, theme }),
  }[variant];

  return {
    ...baseStyle,
    ...orientationStyle,
    ...sizeStyle,
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

const useButtonGroupStyle = ({ orientation }) => {
  const orientationStyle = {
    vertical: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
    },
  }[orientation];

  return {
    display: 'inline-flex',
    ...orientationStyle,
  };
};

export {
  useButtonStyle,
  useButtonBaseStyle,
  useButtonGroupStyle,
};
