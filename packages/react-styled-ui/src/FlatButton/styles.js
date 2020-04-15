import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Solid Button
const solidVariantProps = ({ color = 'gray', theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const _color = colors[color] || color;
  const styles = {
    bg: color,
    borderColor: 'transparent',
    color: 'white:emphasis',
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
    },
    _hover: {
      bg: addOpacity(_color, 0.60),
    },
    _active: {
      bg: addOpacity(_color, 0.60),
    },
    _disabled: {
      bg: 'gray:60',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return styles;
};

// Outline Button
const outlineVariantProps = ({ color = 'gray', theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const _color = colors[color] ? addOpacity(colors[color], 0.92) : addOpacity(color, 0.92);
  const styles = {
    borderColor: _color,
    color: _color,
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
    },
    _hover: {
      bg: addOpacity('black', 0.12),
    },
    _active: {
      bg: addOpacity('black', 0.12),
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
  transition: 'all 250ms',
  appearance: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
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
    ...variantProps(_props),
  };
};

export default useButtonStyle;
