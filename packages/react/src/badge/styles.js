import { useTheme } from '../theme';

const getSolidBadgeContentStyle = (theme) => {
  const backgroundColor = 'error.icon';
  const boxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = theme.get('colors._component.keyboardFocused.innerFocusRing');
  const boxShadow = `0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`;
  const color = 'text._fixed.dark.accent';
  const size = theme?.sizes?.['4x'];

  return {
    backgroundColor,
    borderRadius: 'calc(infinity * 1px)', // creates a fully rounded (pill) shape
    boxShadow,
    color,
    fontSize: 'xs',
    height: size,
    lineHeight: '1',
    minWidth: size,
    px: '1x',
  };
};

const getDotBadgeContentStyle = (theme) => {
  const backgroundColor = 'error.icon';
  const borderRadius = '50%';
  const boxShadowSpreadRadius = theme?.sizes?.['1q'];
  const boxShadowColor = theme.get('colors._component.keyboardFocused.innerFocusRing');
  const boxShadow = `0 0 0 ${boxShadowSpreadRadius} ${boxShadowColor}`;
  const color = 'text.accent';
  const height = theme?.sizes?.['2x'];
  const width = theme?.sizes?.['2x'];

  return {
    backgroundColor,
    borderRadius,
    boxShadow,
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
  const theme = useTheme();
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const variantStyle = {
    'solid': getSolidBadgeContentStyle(theme),
    'dot': getDotBadgeContentStyle(theme),
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
