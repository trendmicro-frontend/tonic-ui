import { ensureNumber } from 'ensure-type';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useTheme } from '../theme';
import pixelize from '../utils/pixelize';

const usePopoverArrowStyle = ({
  arrowHeight: arrowHeightProp,
  arrowWidth: arrowWidthProp,
}) => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const arrowHeight = sizes[arrowHeightProp] ?? pixelize(arrowHeightProp);
  const arrowWidth = sizes[arrowWidthProp] ?? pixelize(arrowWidthProp);
  const dropShadowColor = {
    dark: 'rgba(0, 0, 0, 0.16)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

  return {
    // https://popper.js.org/docs/v2/tutorial/#arrow
    '&[data-popper-placement^="top"]': {
      position: 'absolute',
      bottom: 0,
      '::before': {
        content: '""',
        borderTop: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(0 1px 1px ${dropShadowColor})`,
        position: 'absolute',
        bottom: `-${arrowHeight}`,
        transform: 'translateX(-50%)',
      },
    },
    '&[data-popper-placement^="bottom"]': {
      position: 'absolute',
      top: 0,
      '::before': {
        content: '""',
        borderBottom: `${arrowHeight} solid`,
        borderLeft: `calc(${arrowWidth}/2) solid transparent`,
        borderRight: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(0 -1px 1px ${dropShadowColor})`,
        position: 'absolute',
        top: `-${arrowHeight}`,
        transform: 'translateX(-50%)',
      },
    },
    '&[data-popper-placement^="left"]': {
      position: 'absolute',
      right: 0,
      '::before': {
        content: '""',
        borderLeft: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(1px 0px 1px ${dropShadowColor})`,
        position: 'absolute',
        right: `-${arrowHeight}`,
        transform: 'translateY(-50%)',
      },
    },
    '&[data-popper-placement^="right"]': {
      position: 'absolute',
      left: 0,
      '::before': {
        content: '""',
        borderRight: `${arrowHeight} solid`,
        borderTop: `calc(${arrowWidth}/2) solid transparent`,
        borderBottom: `calc(${arrowWidth}/2) solid transparent`,
        filter: `drop-shadow(-1px 0px 1px ${dropShadowColor})`,
        position: 'absolute',
        left: `-${arrowHeight}`,
        transform: 'translateY(-50%)',
      },
    },
  };
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
