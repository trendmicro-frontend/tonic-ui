import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const getSolidBadgeContentStyle = ({
  colorMode,
  theme,
}) => {
  const backgroundColor = {
    dark: 'red:60',
    light: 'red:60',
  }[colorMode];
  const borderRadius = theme?.sizes?.['4x'];
  const boxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = theme?.colors?.[{
    dark: 'gray:100',
    light: 'white',
  }[colorMode]];
  const boxShadow = `0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`;
  const color = {
    dark: 'white:primary',
    light: 'white:primary',
  }[colorMode];

  return {
    backgroundColor,
    borderRadius,
    boxShadow,
    color,
    fontSize: 'xs',
    height: borderRadius,
    lineHeight: '1',
    minWidth: borderRadius,
    px: '1x',
  };
};

const getDotBadgeContentStyle = ({
  colorMode,
  theme,
}) => {
  const backgroundColor = {
    dark: 'red:60',
    light: 'red:60',
  }[colorMode];
  const borderRadius = theme?.sizes?.['2x'];
  const boxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = theme?.colors?.[{
    dark: 'gray:100',
    light: 'white',
  }[colorMode]];
  const boxShadow = `0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`;
  const color = {
    dark: 'white:primary',
    light: 'white:primary',
  }[colorMode];

  return {
    backgroundColor,
    borderRadius,
    boxShadow,
    color,
    height: borderRadius,
    width: borderRadius,
  };
};

const useBadgeStyle = () => {
  return {
    display: 'inline-flex',
    position: 'relative',
    width: 'fit-content',
  };
};

const useBadgeContentStyle = ({
  variant,
}) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const variantStyle = {
    'solid': getSolidBadgeContentStyle({
      colorMode,
      theme,
    }),
    'dot': getDotBadgeContentStyle({
      colorMode,
      theme,
    }),
  }[variant];

  return {
    ...baseStyle,
    ...variantStyle,
  };
};

const useBadgeContentPlacementStyle = ({
  placement,
}) => {
  const placementStyle = {
    'top-left': {
      top: 0,
      left: 0,
      transform: 'translate(-50%, -50%)',
    },
    'top-right': {
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
    },
    'bottom-left': {
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
    },
    'bottom-right': {
      bottom: 0,
      right: 0,
      transform: 'translate(50%, 50%)',
    },
  }[placement];

  return {
    position: 'absolute',
    ...placementStyle,
  };
};

export {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
};
