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
  const borderColor = {
    dark: 'gray:100',
    light: 'white',
  }[colorMode];
  const borderStyle = 'solid';
  const borderWidth = theme?.sizes?.['1q'];
  const color = {
    dark: 'white:primary',
    light: 'white:primary',
  }[colorMode];
  const fontSize = 'xs';
  const offsetHeight = theme?.lineHeights?.[fontSize];
  const clientHeight = `calc(${offsetHeight} - ${borderWidth} - ${borderWidth})`;

  return {
    backgroundColor,
    borderColor,
    borderRadius: offsetHeight,
    borderStyle,
    borderWidth,
    color,
    fontSize,
    lineHeight: clientHeight,
    minWidth: offsetHeight,
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
  const borderColor = {
    dark: 'gray:100',
    light: 'white',
  }[colorMode];
  const borderRadius = theme?.sizes?.['2x'];
  const borderWidth = theme?.sizes?.['1q'];
  const borderStyle = 'solid';
  const color = {
    dark: 'white:primary',
    light: 'white:primary',
  }[colorMode];
  const height = borderRadius;
  const width = borderRadius;

  return {
    backgroundColor,
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    color,
    height,
    width,
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
