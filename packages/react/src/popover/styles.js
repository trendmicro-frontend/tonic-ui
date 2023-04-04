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

const usePopoverArrowStyle = ({
  arrowHeight: arrowHeightProp,
  arrowWidth: arrowWidthProp,
  placement: placementProp,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'gray:80',
    light: 'white',
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

const usePopoverTriggerStyle = () => {
  return {
    // The popover trigger style will be passed to the wrapper element when the "shouldWrapChildren" prop is set to true
  };
};

const usePopoverContentStyle = ({
  tabIndex,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    dark: 'gray:80',
    light: 'white',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    backgroundColor,
    color,
    boxShadow: colorStyle?.shadow?.thin,
    borderWidth: 1,
    fontSize: 'sm',
    lineHeight: 'sm',
    p: '3x',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'sm',
    maxWidth: '288px',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
  };
};

const usePopoverHeaderStyle = () => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  return {
    fontWeight: 'semibold',
    __after: {
      content: '""',
      display: 'block',
      borderTop: 1,
      borderColor,
      my: '2x',
    },
  };
};

const usePopoverBodyStyle = () => {
  return {
  };
};

const usePopoverFooterStyle = () => {
  return {
    pt: '4x',
  };
};

export {
  usePopoverArrowStyle,
  usePopoverTriggerStyle,
  usePopoverContentStyle,
  usePopoverHeaderStyle,
  usePopoverBodyStyle,
  usePopoverFooterStyle,
};
