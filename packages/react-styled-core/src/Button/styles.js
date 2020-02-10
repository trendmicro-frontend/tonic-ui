import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Solid Button
const solidVariantProps = ({ color = 'gray', colorMode }) => {
  const style = {
    light: {
      bg: `${color}.60`,
      color: 'white',
      _hover: {
        bg: `${color}.50`,
      },
      _active: {
        bg: `${color}.70`,
      },
    },
    dark: {
      bg: `${color}.60`,
      color: 'white',
      _hover: {
        bg: `${color}.50`,
      },
      _active: {
        bg: `${color}.70`,
      },
    },
  };

  return style[colorMode];
};

// Outline Button
const outlineVariantProps = ({ color = 'blue', colorMode, theme: { colors } }) => {
  const normalColor = colors.gray && colors.gray[60];
  const hoveredColor = colors[color] && colors[color][50];
  const activatedColor = colors[color] && colors[color][70];
  const style = {
    light: {
      bg: 'transparent',
      boxShadow: `inset 0 0 0 1px ${normalColor}`,
      color: 'black',
      _hover: {
        boxShadow: `inset 0 0 0 1px ${hoveredColor}`,
        color: `${color}.50`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
        boxShadow: `inset 0 0 0 1px ${activatedColor}`,
        color: `${color}.70`,
      },
    },
    dark: {
      bg: 'transparent',
      boxShadow: `inset 0 0 0 1px ${normalColor}`,
      color: 'white',
      _hover: {
        boxShadow: `inset 0 0 0 1px ${hoveredColor}`,
        color: `${color}.60`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
        boxShadow: `inset 0 0 0 1px ${activatedColor}`,
        color: `${color}.70`,
      },
    },
  };

  return style[colorMode];
};

////////////////////////////////////////////////////////////

const disabledProps = {
  _disabled: {
    opacity: '40%',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
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
        boxShadow: `inset 0 0 0 2px ${outerBorderColor}, inset 0 0 0 3px #fff`,
      }
    },
    dark: {
      _focus: {
        boxShadow: `inset 0 0 0 2px ${outerBorderColor}, inset 0 0 0 3px #000`,
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
  outline: 'none',
  border: 'none',
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
    ...disabledProps,
    ...variantProps(_props),
  };
};

export default useButtonStyle;
