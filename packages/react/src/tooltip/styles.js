import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';

const useTooltipTriggerStyle = () => {
  return {
    // The tooltip trigger style will be passed to the wrapper element when the "shouldWrapChildren" prop is set to true
  };
};

const useTooltipContentStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    px: '3x',
    py: '1x',
    borderRadius: 'sm',
    fontWeight: 'normal',
    fontSize: 'sm',
    lineHeight: 'sm',
  };
  const colorModeStyle = {
    dark: {
      backgroundColor: 'gray:10',
      color: 'black:primary',
      boxShadow: colorStyle?.shadow?.thin,
    },
    light: {
      backgroundColor: 'gray:70',
      color: 'white:primary',
      boxShadow: colorStyle?.shadow?.thin,
    },
  }[colorMode];

  return {
    ...baseStyle,
    ...colorModeStyle,
  };
};

export {
  useTooltipTriggerStyle,
  useTooltipContentStyle,
};
