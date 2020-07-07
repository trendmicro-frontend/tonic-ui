import { setColorWithOpacity } from '../theme/colors';
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
      bg: setColorWithOpacity('black', 0.12),
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
const fillColorVariantProps = ({ borderRadius, color, theme: { colors, radii } }) => {
  let innerRadius;
  const radius = radii[borderRadius] ?? borderRadius;
  innerRadius = `calc(${radius} - 3px)`;
  if (/^\d+(\.\d+)?%$/.test(radius)) {
    innerRadius = radius;
  }
  const _color = colors[`${color}:60`];
  const hoverColor = colors[`${color}:50`];
  const activeColor = colors[`${color}:70`];
  const focusColor = colors['blue:60'];
  const disabledColor = colors['gray:60'];
  const style = {
    borderColor: 'transparent',
    bg: _color,
    color: 'white:emphasis',
    __before: {
      content: '""',
      display: 'inline-block',
      transition: 'all 150ms, background-color 250ms',
      borderRadius: innerRadius,
      zIndex: '-1',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      bg: _color,
    },
    _focus: {
      ':not(:active)': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
        bg: 'transparent',
      },
      '&::before': {
        top: '2px',
        bottom: '2px',
        left: '2px',
        right: '2px',
        bg: focusColor,
      },
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      bg: hoverColor,
      '&::before': {
        bg: hoverColor,
      },
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      bg: activeColor,
      '&::before': {
        bg: activeColor,
      },
    },
    _disabled: {
      bg: disabledColor,
      '&::before': {
        bg: disabledColor,
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
    px: 'calc(.75rem - 1px)', // 12px - 1px
  },
  md: {
    minHeight: '8x', //32px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: 'calc(.75rem - 1px)', // 12px - 1px
  },
  sm: {
    minHeight: '6x', //24px
    fontSize: 'sm',
    lineHeight: 'sm',
    px: 'calc(.75rem - 1px)', // 12px - 1px
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const variantProps = (props) => {
  const { variant } = props;

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
  whiteSpace: 'nowrap',
  border: 1,
  zIndex: 0,
  position: 'relative',
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

const getButtonGroupCSS = ({ useVertical, useDivideLine, useNegativeMargin }) => {
  const horizontalCss = {
    '&:not(:first-of-type)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    // hide last divide line
    '&:last-of-type + *': {
      display: useDivideLine ? 'none' : 'inherit',
    },
    // adjacent sibling
    '&+&': {
      marginLeft: useNegativeMargin ? -1 : 0,
    },
  };
  const verticalCss = {
    '&:not(:first-of-type)': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    // hide last divide line
    '&:last-of-type + *': {
      display: useDivideLine ? 'none' : 'inherit',
    },
    // adjacent sibling
    '&+&': {
      marginTop: useNegativeMargin ? -1 : 0,
    },
  };
  return useVertical ? verticalCss : horizontalCss;
};

export {
  getButtonGroupCSS,
  useButtonStyle,
};
