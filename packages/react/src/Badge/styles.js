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
  const color = {
    dark: 'white:primary',
    light: 'white:primary',
  }[colorMode];

  return {
    backgroundColor,
    borderColor,
    color,
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
  const borderWidth = theme?.sizes?.['1q'];
  const fontSize = 'xs';
  const minorAxisLength = theme?.lineHeights?.[fontSize]; // ellipsis: width=majorAxisLength, height=minorAxisLength
  const lineHeight = `calc(${minorAxisLength} - ${borderWidth} - ${borderWidth})`;
  const baseStyle = {
    borderColor: 'transparent',
    borderRadius: minorAxisLength,
    borderStyle: 'solid',
    borderWidth,
    fontSize,
    lineHeight,
    minWidth: minorAxisLength,
    px: '1x',
  };
  const layoutStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const variantStyle = {
    'solid': getSolidBadgeContentStyle({
      colorMode,
      theme,
    }),
  }[variant];

  return {
    ...baseStyle,
    ...layoutStyle,
    ...variantStyle,
  };
};

const useBadgeContentPlacementStyle = ({
  placement,
}) => {
  return {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(50%, -50%)',
  };
};

export {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
};
