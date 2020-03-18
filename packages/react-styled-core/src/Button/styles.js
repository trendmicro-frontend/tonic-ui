import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Solid Button
const solidVariantProps = ({ color = 'gray', colorMode, theme: { colors } }) => {
  const outerBorderColor = colors['blue:40'];
  const style = {
    light: {
      bg: `${color}:60`,
      borderColor: 'transparent',
      color: 'white',
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        bg: `${color}:50`,
      },
      _active: {
        bg: `${color}:70`,
      },
      _disabled: {
        bg: 'gray:60',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
    dark: {
      bg: `${color}:60`,
      borderColor: 'transparent',
      color: 'white',
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        bg: `${color}:50`,
      },
      _active: {
        bg: `${color}:70`,
      },
      _disabled: {
        bg: 'gray:60',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
  };

  return style[colorMode];
};

// Outline Button
const outlineVariantProps = ({ color = 'blue', colorMode, theme: { colors } }) => {
  const normalColor = colors[`${color}:40`];
  const outerBorderColor = colors['blue:60'];
  const style = {
    light: {
      borderColor: `${color}:60`,
      color: addOpacity(normalColor, 0.92),
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        color: `${color}:40`,
      },
      _active: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        bg: addOpacity('black', 0.12),
        color: `${color}:40`,
      },
      _disabled: {
        borderColor: 'gray:60',
        color: 'black',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
    dark: {
      borderColor: `${color}:60`,
      color: addOpacity(normalColor, 0.92),
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        color: `${color}:40`,
      },
      _active: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        bg: addOpacity('black', 0.12),
        color: `${color}:40`,
      },
      _disabled: {
        borderColor: 'gray:60',
        color: 'white',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
  };

  return style[colorMode];
};

// Secondary Button
const secondaryVariantProps = ({ color, colorMode, theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const style = {
    light: {
      borderColor: 'gray:60',
      color: 'rgba(0, 0, 0, 0.92)',
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        color: `${color}:40`,
      },
      _active: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        bg: addOpacity('black', 0.12),
        color: `${color}:40`,
      },
      _disabled: {
        borderColor: 'gray:60',
        color: 'black',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
    dark: {
      borderColor: 'gray:60',
      color: 'rgba(255, 255, 255, 0.92)',
      _focus: {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      },
      _hover: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        color: `${color}:40`,
      },
      _active: {
        '&:not(:focus)': {
          borderColor: `${color}:50`,
        },
        bg: addOpacity('black', 0.12),
        color: `${color}:40`,
      },
      _disabled: {
        borderColor: 'gray:60',
        color: 'white',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
  };

  return style[colorMode];
};

// Ghost Button
const ghostVariantProps = (props) => {
  const styles = {
    ...secondaryVariantProps(props),
    borderColor: 'transparent',
  };

  return styles;
};

// Defined Button
const definedVariantProps = ({ color, colorMode, theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const style = {
    light: {
      bg: `${color}:60`,
      borderColor: 'transparent',
      color: 'white',
      _focus: {
        ':not(:active)': {
          borderColor: outerBorderColor,
          boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
          bg: 'inherit',
        },
        '& > :first-of-type': {
          bg: `${color}:60`,
        },
      },
      _hover: {
        '&:not(:focus)': {
          bg: `${color}:50`,
        },
        '& > :first-of-type': {
          bg: `${color}:50`,
        }
      },
      _active: {
        bg: `${color}:70`,
        '& > :first-of-type': {
          bg: `${color}:70`,
        }
      },
      _disabled: {
        bg: 'gray:60',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
    dark: {
      bg: `${color}:60`,
      borderColor: 'transparent',
      color: 'white',
      _focus: {
        ':not(:active)': {
          borderColor: outerBorderColor,
          boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
          bg: 'inherit',
        },
        '& > :first-of-type': {
          bg: `${color}:60`,
        },
      },
      _hover: {
        '&:not(:focus)': {
          bg: `${color}:50`,
        },
        '& > :first-of-type': {
          bg: `${color}:50`,
        }
      },
      _active: {
        bg: `${color}:70`,
        '& > :first-of-type': {
          bg: `${color}:70`,
        }
      },
      _disabled: {
        bg: 'gray:60',
        cursor: 'not-allowed',
        opacity: 0.28,
      },
    },
  };

  return style[colorMode];
};

////////////////////////////////////////////////////////////

const sizes = {
  lg: {
    minHeight: '2.5rem', // 40px
    fontSize: 'md',
    lineHeight: 'md',
  },
  md: {
    minHeight: '2rem', //32px
    fontSize: 'sm',
    lineHeight: 'sm',
  },
  sm: {
    minHeight: '1.5rem', //24px
    fontSize: 'sm',
    lineHeight: 'sm',
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const selectedProps = {
  _selected: {
    bg: 'blue:60',
    borderColor: 'blue:60',
    color: 'white',
  },
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  const variant = props.variant;

  switch (variant) {
  case 'solid':
    return solidVariantProps(props);
  case 'outline':
    return outlineVariantProps(props);
  case 'secondary':
    return secondaryVariantProps({ ...props, color: 'blue' });
  case 'ghost':
    return ghostVariantProps({ ...props, color: 'blue' });
  case 'emphasis':
    return definedVariantProps({ ...props, color: 'red' });
  case 'primary':
    return definedVariantProps({ ...props, color: 'blue' });
  case 'default':
    return definedVariantProps({ ...props, color: 'gray' });
  default:
    return {};
  }
};

////////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  appearance: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  border: 1,
};

const definedBaseProps = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  transition: 'all 350ms',
  appearance: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  border: 1,
  bg: 'inherit',
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme };
  const buttonBaseProps = props.isDefinedButton ? definedBaseProps : baseProps;
  return {
    ...buttonBaseProps,
    ...selectedProps,
    ...sizeProps(_props),
    ...variantProps(_props),
  };
};

export default useButtonStyle;
