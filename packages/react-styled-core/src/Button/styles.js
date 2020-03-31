import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Secondary Button
const secondaryVariantProps = ({ color, colorMode, theme: { colors } }) => {
  const isDarkMode = (colorMode === 'dark');
  const outerBorderColor = colors['blue:60'];
  const style = {
    borderColor: 'gray:60',
    color: isDarkMode ? 'white:primary' : 'black:primary',
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      '&:not(:focus)': {
        borderColor: `${color}:50`,
      },
      color: `${color}:40`,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
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
      color: isDarkMode ? 'white:emphasis' : 'black',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return style;
};

// Ghost Button
const ghostVariantProps = (props) => {
  const styles = {
    ...secondaryVariantProps(props),
    borderColor: 'transparent',
  };

  return styles;
};

// Fill Color Button
const fillColorVariantProps = ({ color, theme: { colors } }) => {
  const outerBorderColor = colors['blue:60'];
  const style = {
    bg: `${color}:60`,
    borderColor: 'transparent',
    color: 'white:emphasis',
    _focus: {
      ':not(:active)': {
        borderColor: outerBorderColor,
        boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
        bg: 'inherit',
      },
      '& > :first-of-type': {
        top: '2px',
        bottom: '2px',
        left: '2px',
        right: '2px',
        bg: `${color}:60`,
      },
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      bg: `${color}:50`,
      '& > :first-of-type': {
        bg: `${color}:50`,
      },
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      bg: `${color}:70`,
      '& > :first-of-type': {
        bg: `${color}:70`,
      },
    },
    _disabled: {
      bg: 'gray:60',
      '& > :first-of-type': {
        bg: 'inherit',
      },
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return style;
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

const selectedProps = {
  _selected: {
    bg: 'blue:60',
    borderColor: 'blue:60',
    color: 'white:emphasis',
    '& > :first-of-type': {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      bg: 'inherit',
    },
    '&:focus': {
      boxShadow: 'unset',
    }
  },
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  const variant = props.variant;

  switch (variant) {
  case 'secondary':
    return secondaryVariantProps({ ...props, color: 'blue' });
  case 'ghost':
    return ghostVariantProps({ ...props, color: 'blue' });
  case 'emphasis':
    return fillColorVariantProps({ ...props, color: 'red' });
  case 'primary':
    return fillColorVariantProps({ ...props, color: 'blue' });
  case 'default':
    return fillColorVariantProps({ ...props, color: 'gray' });
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
  position: 'relative',
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...selectedProps,
    ...sizeProps(_props),
    ...variantProps(_props),
  };
};

export default useButtonStyle;
