import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { setColorWithOpacity } from '../utils/colors';
import { createTransitionStyle, transitionEasing } from '../utils/transitions';

// Solid Button
const solidVariantProps = ({ color = 'gray', theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const _color = colors[color] || color;
  const styles = {
    backgroundColor: color,
    borderColor: 'transparent',
    color: 'white:emphasis',
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
    },
    _hover: {
      backgroundColor: setColorWithOpacity(_color, 0.60),
    },
    _active: {
      backgroundColor: setColorWithOpacity(_color, 0.60),
    },
    _disabled: {
      backgroundColor: 'gray:60',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

// Outline Button
const outlineVariantProps = ({ color = 'gray', theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const _color = colors[color] ? setColorWithOpacity(colors[color], 0.92) : setColorWithOpacity(color, 0.92);
  const styles = {
    borderColor: _color,
    color: _color,
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
    },
    _hover: {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    _active: {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    _disabled: {
      borderColor: 'gray:60',
      color: 'white:emphasis',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

////////////////////////////////////////////////////////////

const sizes = {
  lg: {
    minHeight: '10x', // 40px
    fontSize: 'md',
    lineHeight: 'md',
  },
  md: {
    minHeight: '8x', //32px
    fontSize: 'sm',
    lineHeight: 'sm',
  },
  sm: {
    minHeight: '6x', //24px
    fontSize: 'sm',
    lineHeight: 'sm',
  },
};

const sizeProps = ({ size }) => sizes[size];

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
  alignItems: 'center',
  justifyContent: 'center',
  transition: createTransitionStyle(['background-color', 'border-color', 'box-shadow', 'color'], {
    duration: 250,
    easing: transitionEasing.easeInOut,
  }),
  appearance: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  border: 1,
};

////////////////////////////////////////////////////////////

const useFlatButtonStyle = props => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...variantProps(_props),
  };
};

export {
  useFlatButtonStyle,
};
