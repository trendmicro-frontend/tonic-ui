import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Emphasis Button
const emphasisVariantProps = ({ colorMode }) => {
  const bgColor = 'red';
  const style = {
    light: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
    dark: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
  };

  return style[colorMode];
};

// Primary Button
const primaryVariantProps = ({ colorMode }) => {
  const bgColor = 'blue';
  const style = {
    light: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
    dark: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
  };

  return style[colorMode];
};

// Default Button
const defaultVariantProps = ({ colorMode }) => {
  const bgColor = 'gray';
  const style = {
    light: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
    dark: {
      bg: `${bgColor}.60`,
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        bg: `${bgColor}.50`,
      },
      _active: {
        bg: `${bgColor}.70`,
      },
    },
  };

  return style[colorMode];
};

// Secondary Button
const secondaryVariantProps = ({ colorMode }) => {
  const color = 'blue';
  const style = {
    light: {
      bg: 'transparent',
      borderColor: 'gray.60',
      color: '#000',
      minWidth: '5rem', //80px
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.50`,
      },
      _active: {
        borderColor: `${color}.70`,
        color: `${color}.70`,
      },
    },
    dark: {
      bg: 'transparent',
      color: '#fff',
      minWidth: '5rem', //80px
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.60`,
      },
      _active: {
        borderColor: `${color}.70`,
        color: `${color}.70`,
      },
    },
  };

  return style[colorMode];
};

// Ghost Button
const ghostVariantProps = ({ colorMode }) => {
  const color = 'blue';
  const style = {
    light: {
      borderColor: 'transparent',
      bg: 'transparent',
      color: '#000',
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.50`,
      },
      _active: {
        borderColor: `${color}.70`,
        color: `${color}.70`,
      },
    },
    dark: {
      borderColor: 'transparent',
      bg: 'transparent',
      color: '#fff',
      _hover: {
        borderColor: `${color}.50`,
        color: `${color}.50`,
      },
      _active: {
        borderColor: `${color}.70`,
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
    height: '2.5rem', // 40px
    fontSize: 'md',
    lineHeight: 'md',
    px: '3x',
  },
  md: {
    height: '2rem', //32px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
  },
  sm: {
    height: '1.5rem', //24px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const focusProps = {
  _focus: {
    boxShadow: 'outline',
  },
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  switch (props.color) {
  case 'emphasis':
    return emphasisVariantProps(props);
  case 'primary':
    return primaryVariantProps(props);
  case 'default':
    return defaultVariantProps(props);
  case 'secondary':
    return secondaryVariantProps(props);
  case 'ghost':
    return ghostVariantProps(props);
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
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...focusProps,
    ...disabledProps,
    ...variantProps(_props),
  };
};

export default useButtonStyle;
