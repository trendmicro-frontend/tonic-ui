import { ensureNumber, ensureString } from 'ensure-type';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useTheme } from '../theme';

const pixelize = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  value = ensureNumber(value);
  return `${value}px`;
};

const useTooltipArrowStyle = ({
  arrowHeight: arrowHeightProp,
  arrowWidth: arrowWidthProp,
  placement: placementProp,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'gray:10',
    light: 'gray:70',
  }[colorMode];
  const { sizes } = useTheme();
  const arrowHeight = sizes[arrowHeightProp] ?? pixelize(arrowHeightProp);
  const arrowWidth = sizes[arrowWidthProp] ?? pixelize(arrowWidthProp);
  const placement = ensureString(placementProp);
  const dropShadowColor = {
    dark: 'rgba(0, 0, 0, 0.16)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

  if (placement.startsWith('top')) {
    return {
      color,
      position: 'absolute',
      bottom: 0,
      __before: {
        content: '""',
        borderTop: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(0 1px 1px ${dropShadowColor})`,
        position: 'absolute',
        bottom: `-${arrowHeight}`,
        transform: 'translateX(-50%)',
      },
    };
  }

  if (placement.startsWith('bottom')) {
    return {
      color,
      position: 'absolute',
      top: 0,
      __before: {
        content: '""',
        borderBottom: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(0 -1px 1px ${dropShadowColor})`,
        position: 'absolute',
        top: `-${arrowHeight}`,
        transform: 'translateX(-50%)',
      },
    };
  }

  if (placement.startsWith('left')) {
    return {
      color,
      position: 'absolute',
      right: 0,
      __before: {
        content: '""',
        borderLeft: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(1px 0px 1px ${dropShadowColor})`,
        position: 'absolute',
        right: `-${arrowHeight}`,
        transform: 'translateY(-50%)',
      },
    };
  }

  if (placement.startsWith('right')) {
    return {
      color,
      position: 'absolute',
      left: 0,
      __before: {
        content: '""',
        borderRight: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(-1px 0px 1px ${dropShadowColor})`,
        position: 'absolute',
        left: `-${arrowHeight}`,
        transform: 'translateY(-50%)',
      },
    };
  }

  return {};
};

const useTooltipTriggerStyle = () => {
  return {
    // The tooltip trigger style will be passed to the wrapper element when the "shouldWrapChildren" prop is set to true
  };
};

const useTooltipContentStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    dark: 'gray:10',
    light: 'gray:70',
  }[colorMode];
  const color = {
    dark: 'black:primary',
    light: 'white:primary',
  }[colorMode];

  return {
    backgroundColor,
    borderRadius: 'sm',
    boxShadow: colorStyle?.shadow?.thin,
    color,
    fontWeight: 'normal',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '3x',
    py: '1x',
  };
};

export {
  useTooltipArrowStyle,
  useTooltipTriggerStyle,
  useTooltipContentStyle,
};
