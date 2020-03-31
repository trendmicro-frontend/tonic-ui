import useColorMode from '../useColorMode';

const colorProps = ({ variantColor, colorMode }) => {
  if (variantColor === 'gray') {
    return {
      dark: {
        bg: 'gray:10',
        color: 'black:primary',
      },
      light: {
        bg: 'gray:70',
        color: 'white:primary',
      },
    }[colorMode];
  }

  return {
    bg: `${variantColor}:60`,
    color: 'white:primary',
  };
};

const baseProps = {
  px: '3x',
  py: '1x',
  borderRadius: 'sm',
  fontWeight: 'normal',
  fontSize: 'sm',
  zIndex: 'tooltip',
};

const useTooltipStyle = props => {
  const { colorMode } = useColorMode();
  const _props = { ...props, colorMode };
  return {
    ...baseProps,
    ...colorProps(_props)
  };
};

export default useTooltipStyle;
