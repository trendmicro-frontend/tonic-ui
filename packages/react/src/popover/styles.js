import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';

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
  usePopoverTriggerStyle,
  usePopoverContentStyle,
  usePopoverHeaderStyle,
  usePopoverBodyStyle,
  usePopoverFooterStyle,
};
