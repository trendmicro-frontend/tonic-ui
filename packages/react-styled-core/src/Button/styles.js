import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Solid Button
const solidVariantProps = ({ color = 'gray', colorMode, borderRadius }) => {
  const style = {
    light: {
      bg: `${color}.60`,
      borderRadius: borderRadius || 'sm',
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
      borderRadius: borderRadius || 'sm',
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
const outlineVariantProps = ({ color = 'blue', colorMode, borderRadius }) => {
  const style = {
    light: {
      bg: 'transparent',
      borderRadius: borderRadius || 'sm',
      __before: {
        content: '""',
        border: '1px solid',
        borderColor: 'gray.60',
        borderRadius: borderRadius || 'sm',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      color: 'black',
      _hover: {
        color: `${color}.50`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
        color: `${color}.70`,
      },
    },
    dark: {
      bg: 'transparent',
      borderRadius: borderRadius || 'sm',
      color: 'white',
      __before: {
        content: '""',
        border: '1px solid',
        borderColor: 'gray.60',
        borderRadius: borderRadius || 'sm',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      _hover: {
        color: `${color}.60`,
      },
      _active: {
        bg: addOpacity('black', 0.12),
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

const focusProps = ({ colorMode, borderRadius }) => {
  const style = {
    light: {
      _focus: {
        '::before': { // outer border
          content: '""',
          border: '2px solid',
          borderColor: 'blue.60',
          borderRadius: borderRadius || 'sm',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        '::after': { // inner border
          content: '""',
          border: '1px solid',
          borderColor: 'white',
          borderRadius: borderRadius || 'sm',
          position: 'absolute',
          top: '2px',
          bottom: '2px',
          left: '2px',
          right: '2px',
        },
      }
    },
    dark: {
      _focus: {
        '::before': { // outer border
          content: '""',
          border: '2px solid',
          borderColor: 'blue.60',
          borderRadius: borderRadius || 'sm',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        '::after': { // inner border
          content: '""',
          border: '1px solid',
          borderColor: 'black',
          position: 'absolute',
          top: '2px',
          bottom: '2px',
          left: '2px',
          right: '2px',
        },
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
