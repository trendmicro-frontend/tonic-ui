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

  if (placement.startsWith('top')) {
    return {
      color,
      position: 'absolute',
      bottom: 0,
      __before: {
        position: 'absolute',
        content: '""',
        bottom: `-${arrowHeight}`,
        left: `calc(-${arrowWidth}/2)`,
        right: `calc(-${arrowWidth}/2)`,
        borderTop: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
      },
    };
  }

  if (placement.startsWith('bottom')) {
    return {
      color,
      position: 'absolute',
      top: 0,
      __before: {
        position: 'absolute',
        content: '""',
        top: `-${arrowHeight}`,
        left: `calc(-${arrowWidth}/2)`,
        right: `calc(-${arrowWidth}/2)`,
        borderBottom: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
      },
    };
  }

  if (placement.startsWith('left')) {
    return {
      color,
      position: 'absolute',
      right: 0,
      __before: {
        position: 'absolute',
        content: '""',
        right: `-${arrowHeight}`,
        top: `calc(-${arrowWidth}/2)`,
        bottom: `calc(-${arrowWidth}/2)`,
        borderLeft: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
      },
    };
  }

  if (placement.startsWith('right')) {
    return {
      color,
      position: 'absolute',
      left: 0,
      __before: {
        position: 'absolute',
        content: '""',
        left: `-${arrowHeight}`,
        top: `calc(-${arrowWidth}/2)`,
        bottom: `calc(-${arrowWidth}/2)`,
        borderRight: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
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
