import useColorMode from '../useColorMode';

const colorProps = props => {
  const { variantColor, colorMode } = props;

  return {
    bg: variantColor || (colorMode === 'dark' ? 'gray:10' : 'gray:70'),
    color: colorMode === 'dark' ? 'black:emphasis' : 'white:emphasis',
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
