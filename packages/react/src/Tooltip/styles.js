import { useColorMode } from '../ColorMode';
import { useColorStyle } from '../ColorStyle';

const baseProps = {
  px: '3x',
  py: '1x',
  borderRadius: 'sm',
  fontWeight: 'normal',
  fontSize: 'sm',
  lineHeight: 'sm',
  zIndex: 'tooltip',
};

const useTooltipStyle = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
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
    ...baseProps,
    ...colorModeStyle,
  };
};

export {
  useTooltipStyle,
};
