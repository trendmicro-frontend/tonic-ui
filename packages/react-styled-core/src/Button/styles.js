import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Solid Button
const solidVariantProps = ({ color = 'gray', colorMode }) => {
  const style = {
    light: {
      bg: `${color}.60`,
      borderColor: 'transparent',
      color: 'white',
      _hover: {
        bg: `${color}.50`,
      },
      _active: {
        bg: `${color}.70`,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
      _disabled: {
        bg: `${color}.60`,
        borderColor: 'transparent',
        boxShadow: 'none',
        cursor: 'not-allowed',
        opacity: '40%',
      },
    },
    dark: {
      bg: `${color}.60`,
      borderColor: 'transparent',
      color: 'white',
      _hover: {
        bg: `${color}.50`,
      },
      _active: {
        bg: `${color}.70`,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
      _disabled: {
        bg: `${color}.60`,
        borderColor: 'transparent',
        boxShadow: 'none',
        cursor: 'not-allowed',
        opacity: '40%',
      },
    },
  };

  return style[colorMode];
};

// Outline Button
const outlineVariantProps = ({ color = 'blue', colorMode }) => {
  const style = {
    light: {
      borderColor: 'gray.60',
      color: 'black',
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.50`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
        borderColor: `${color}.70`,
        boxShadow: 'none',
        color: `${color}.70`,
      },
      _disabled: {
        bg: 'transparent',
        borderColor: 'gray.60',
        boxShadow: 'none',
        color: 'black',
        cursor: 'not-allowed',
        opacity: '40%',
      },
    },
    dark: {
      borderColor: 'gray.60',
      color: 'white',
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.50`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
        borderColor: `${color}.70`,
        boxShadow: 'none',
        color: `${color}.70`,
      },
      _disabled: {
        bg: 'transparent',
        borderColor: 'gray.60',
        boxShadow: 'none',
        color: 'white',
        cursor: 'not-allowed',
        opacity: '40%',
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
    px: '3x',
  },
  md: {
    minHeight: '2rem', //32px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
  },
  sm: {
    minHeight: '1.5rem', //24px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const focusProps = ({ colorMode, theme: { colors } }) => {
  const outerBorderColor = colors.blue && colors.blue[60];
  const style = {
    light: {
      _focus: {
        zIndex: 1,
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}, inset 0 0 0 2px #fff`,
      }
    },
    dark: {
      _focus: {
        zIndex: 1,
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}, inset 0 0 0 2px #000`,
      }
    },
  };

  return style[colorMode];
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  const variant = props.variant;

  switch (variant) {
  case 'solid':
    return solidVariantProps(props);
  case 'outline':
    return outlineVariantProps(props);
  default:
    return {};
  }
};

////////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  border: 1,
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...focusProps(_props),
    ...variantProps(_props),
  };
};

export default useButtonStyle;
