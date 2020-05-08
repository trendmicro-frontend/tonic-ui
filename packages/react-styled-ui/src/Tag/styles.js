import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const solidStyle = ({ color, theme: { colors } }) => {
  const solidColors = {
    gray: {
      bg: 'gray:70',
      color: 'gray:20'
    },
    red: {
      bg: 'red:80',
      color: 'red:20'
    },
    magenta: {
      bg: 'magenta:80',
      color: 'magenta:20'
    },
    purple: {
      bg: 'purple:80',
      color: 'purple:20'
    },
    blue: {
      bg: 'blue:80',
      color: 'blue:20'
    },
    green: {
      bg: 'green:70',
      color: 'green:20'
    },
    teal: {
      bg: 'teal:70',
      color: 'teal:20'
    },
    cyan: {
      bg: 'cyan:70',
      color: 'cyan:20'
    },
  };
  const colorStyle = solidColors[color] || {
    bg: `${color}:80`,
    color: `${color}:20`,
  };
  const focusColor = colors['blue:60'];
  const styles = {
    border: 'none',
    ...colorStyle,
    _focus: {
      boxShadow: `inset 0 0 0 2px ${focusColor}`,
      bg: 'inherit',
      '& > :first-of-type': {
        top: '3px',
        bottom: '3px',
        left: '3px',
        right: '3px',
        bg: `${color}:60`,
      },
    },
    _disabled: {
      boxShadow: 'none', // override focus style
      bg: 'gray:60',
      '& > :first-of-type': {
        bg: 'inherit',
      },
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

const outlineStyle = ({ color, colorMode, theme: { colors } }) => {
  const outlineColors = {
    gray: {
      borderColor: 'gray:50',
      color: 'gray:40'
    },
  };
  const colorStyle = outlineColors[color] || {
    borderColor: `${color}:50`,
    color: `${color}:50`,
  };
  const isDarkMode = (colorMode === 'dark');
  const focusColor = colors['blue:60'];
  const styles = {
    border: 1,
    ...colorStyle,
    _focus: {
      borderColor: focusColor,
      boxShadow: `inset 0 0 0 1px ${focusColor}`,
    },
    _disabled: {
      borderColor: 'gray:60',
      boxShadow: 'none',
      color: isDarkMode ? 'white:emphasis' : 'black',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

const invalidStyle = ({ theme: { colors } }) => {
  const focusColor = colors['blue:60'];
  const styles = {
    border: 'none',
    bg: 'red:60',
    color: 'white:emphasis',
    _focus: {
      boxShadow: `inset 0 0 0 2px ${focusColor}`,
      bg: 'inherit',
      '& > :first-of-type': {
        top: '2px',
        bottom: '2px',
        left: '2px',
        right: '2px',
        bg: 'red:60',
      },
    },
    _disabled: {
      boxShadow: 'none', // override focus style
      bg: 'gray:60',
      '& > :first-of-type': {
        bg: 'inherit',
      },
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

const variantProps = props => {
  const variant = props.variant;
  const invalid = props.invalid;

  if (invalid) {
    return invalidStyle(props);
  }

  switch (variant) {
  case 'solid':
    return solidStyle(props);
  case 'outline':
    return outlineStyle(props);
  default:
    return {};
  }
};

////////////////////////////////////////////////////////////

const sizes = {
  sm: {
    fontSize: 'xs',
    lineHeight: 1,
    minHeight: '4x',
    px: '2x',
  },
  md: {
    fontSize: 'xs',
    lineHeight: 1,
    minHeight: '6x',
    px: '2x',
  },
  lg: {
    fontSize: 'md',
    lineHeight: 1,
    minHeight: '8x',
    px: '2x',
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'default',
  position: 'relative',
  outline: 'none',
};

////////////////////////////////////////////////////////////

const useTagStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...variantProps(_props),
  };
};

////////////////////////////////////////////////////////////

const useTagCloseButtonStyle = ({ size }) => {
  const color = setColorWithOpacity('white', 0.6);
  const hoverColor = 'white';
  const activeColor = color;
  const _size = {
    sm: '4x',
    md: '6x',
    lg: '8x',
  }[size];

  return {
    color: color,
    transition: 'all .2s',
    width: _size,
    height: _size,
    ml: '1x',
    mr: -8,
    // mt: -2,
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _disabled: {
      color: 'white',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
