import { get } from '@styled-system/core';
import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

// Secondary Button
const secondaryVariantProps = ({ color, colorMode, theme: { colors } }) => {
  // color
  const _color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const hoverColor = {
    dark: `${color}:40`,
    light: `${color}:40`,
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const activeColor = hoverColor;
  const focusColor = _color;
  // border color
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:60',
  }[colorMode];
  const hoverBorderColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const activeBorderColor = hoverBorderColor;
  const focusBorderColor = 'blue:60';
  const disabledBorderColor = borderColor;

  const style = {
    borderColor: borderColor,
    color: _color,
    _focus: {
      color: focusColor,
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 1px ${get(colors, focusBorderColor)}`,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      color: hoverColor,
      '&:not(:focus)': {
        borderColor: hoverBorderColor,
      },
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      color: activeColor,
      '&:not(:focus)': {
        borderColor: activeBorderColor,
      },
      bg: setColorWithOpacity('black', 0.12),
    },
    _disabled: {
      color: disabledColor,
      borderColor: disabledBorderColor,
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return style;
};

// Ghost Button
const ghostVariantProps = (props) => {
  const secondaryProps = secondaryVariantProps(props);
  const styles = {
    ...secondaryProps,
    borderColor: 'transparent',
    _disabled: {
      ...secondaryProps._disabled,
      borderColor: 'transparent',
    },
  };

  return styles;
};

// Fill Color Button
const fillColorVariantProps = ({ borderRadius, color, colorMode, theme: { colors, radii } }) => {
  let innerRadius;
  const radius = radii[borderRadius] ?? borderRadius;
  innerRadius = `calc(${radius} - 3px)`;
  if (/^\d+(\.\d+)?%$/.test(radius)) {
    innerRadius = radius;
  }

  // background color
  const bgColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const focusBgColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const hoverBgColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const activeBgColor = {
    dark: `${color}:70`,
    light: `${color}:70`,
  }[colorMode];
  const disabledBgColor = 'gray:60';
  // border color
  const focusBorderColor = 'blue:60';

  const style = {
    borderColor: 'transparent',
    bg: bgColor,
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
      bg: bgColor,
    },
    _focus: {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 1px ${get(colors, focusBorderColor)}`,
        bg: 'transparent',
      },
      '&::before': {
        top: '2px',
        bottom: '2px',
        left: '2px',
        right: '2px',
        bg: focusBgColor,
      },
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      bg: hoverBgColor,
      '&::before': {
        bg: hoverBgColor,
      },
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      bg: activeBgColor,
      '&::before': {
        bg: activeBgColor,
      },
    },
    _disabled: {
      bg: disabledBgColor,
      '&::before': {
        bg: disabledBgColor,
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
    '& + *': {
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
    '& + *': {
      marginTop: useNegativeMargin ? -1 : 0,
    },
  };
  return useVertical ? verticalCss : horizontalCss;
};

export {
  getButtonGroupCSS,
  useButtonStyle,
};
